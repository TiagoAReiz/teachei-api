"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, iconPosition = "left", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            ref={ref}
            className={cn(
              "w-full bg-surface border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-full h-[52px] px-4 focus:ring-2 focus:ring-primary focus:bg-surface transition-all text-base",
              icon && iconPosition === "left" && "pl-12",
              (icon && iconPosition === "right") || isPassword ? "pr-12" : "",
              error && "ring-error focus:ring-error",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-muted hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {icon && iconPosition === "right" && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };



