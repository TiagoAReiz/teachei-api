import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  showIcon?: boolean;
}

const sizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

const iconSizes = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

function LogoContent({ size, className, showIcon }: { size: "sm" | "md" | "lg"; className?: string; showIcon: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div className={cn(
          "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent",
          iconSizes[size]
        )}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-2/3 h-2/3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 17h14v-5l-2-4H7l-2 4v5z" />
            <circle cx="7.5" cy="17" r="1.5" />
            <circle cx="16.5" cy="17" r="1.5" />
            <path d="M19 7l2-2" strokeWidth="2.5" />
          </svg>
        </div>
      )}
      <span className={cn(
        "font-bold tracking-tight",
        sizes[size]
      )}>
        <span className="text-foreground">Te</span>
        <span className="text-primary">Achei</span>
      </span>
    </div>
  );
}

function Logo({ size = "md", className, href = "/", showIcon = true }: LogoProps) {
  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        <LogoContent size={size} className={className} showIcon={showIcon} />
      </Link>
    );
  }

  return <LogoContent size={size} className={className} showIcon={showIcon} />;
}

export { Logo };
