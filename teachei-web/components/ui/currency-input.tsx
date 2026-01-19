"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label?: string;
  error?: string;
  value: number | null;
  onChange: (value: number | null) => void;
}

/**
 * Format a number to Brazilian currency display (without R$ prefix)
 * e.g., 50000 -> "50.000,00"
 */
function formatCurrencyValue(value: number | null): string {
  if (value === null || value === 0) return "";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, label, error, value, onChange, placeholder = "R$ 0,00", ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(() => formatCurrencyValue(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      
      // Allow only digits and formatting characters
      const digitsOnly = input.replace(/\D/g, "");
      
      if (!digitsOnly) {
        setDisplayValue("");
        onChange(null);
        return;
      }
      
      // Convert to number (digits represent cents)
      const cents = parseInt(digitsOnly, 10);
      const numericValue = cents / 100;
      
      // Format for display
      const formatted = numericValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      
      setDisplayValue(formatted);
      onChange(numericValue);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
            <span className="text-base font-medium">R$</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder.replace("R$ ", "")}
            className={cn(
              "w-full bg-surface border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-full h-[52px] px-4 pl-12 focus:ring-2 focus:ring-primary focus:bg-surface transition-all text-base",
              error && "ring-error focus:ring-error",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
