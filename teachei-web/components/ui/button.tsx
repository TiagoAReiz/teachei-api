"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-ring btn-press disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:shadow-primary/40",
      secondary: "bg-surface hover:bg-muted/10 text-foreground border border-border",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-foreground hover:bg-muted/10",
      danger: "bg-error hover:bg-error/90 text-white",
      whatsapp: "bg-whatsapp hover:bg-whatsapp/90 text-white shadow-lg shadow-whatsapp/30",
    };
    
    const sizes = {
      sm: "h-9 px-4 text-sm rounded-full",
      md: "h-11 px-6 text-base rounded-full",
      lg: "h-14 px-8 text-lg rounded-full",
      icon: "h-11 w-11 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };



