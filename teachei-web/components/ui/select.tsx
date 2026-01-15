"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full appearance-none bg-surface border-0 ring-1 ring-border text-foreground rounded-full h-[52px] px-4 pr-10 focus:ring-2 focus:ring-primary focus:bg-surface transition-all text-base cursor-pointer",
              error && "ring-error focus:ring-error",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-muted">
            <ChevronDown size={20} />
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };



