import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

const imageSizes = {
  sm: { width: 80, height: 32 },
  md: { width: 120, height: 48 },
  lg: { width: 160, height: 64 },
  xl: { width: 200, height: 80 },
};

function LogoContent({ size, className }: { size: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const { width, height } = imageSizes[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="TeAchei"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}

function Logo({ size = "md", className, href = "/" }: LogoProps) {
  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        <LogoContent size={size} className={className} />
      </Link>
    );
  }

  return <LogoContent size={size} className={className} />;
}

export { Logo };
