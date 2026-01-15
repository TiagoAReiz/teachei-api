import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, ...props }, ref) => {
    const variants = {
      default: "bg-surface shadow-md",
      elevated: "bg-surface shadow-xl",
      outlined: "bg-surface border border-border",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden",
          variants[variant],
          hoverable && "card-hover cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pb-0", className)} {...props} />
  )
);

CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
  )
);

CardFooter.displayName = "CardFooter";

const CardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { src: string; alt: string }>(
  ({ className, src, alt, ...props }, ref) => (
    <div ref={ref} className={cn("relative w-full h-48", className)} {...props}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
    </div>
  )
);

CardImage.displayName = "CardImage";

export { Card, CardHeader, CardContent, CardFooter, CardImage };



