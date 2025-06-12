import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLHeadingElement>;
  varient?: "primary" | "secondary" | "inverted" | "default";
}

const variants = {
  primary: "text-primary",
  secondary: "text-secondary",
  inverted: "text-background",
  default: "text-foreground",
};

export default function Heading({
  children,
  className = "",
  varient = "default",
  ...props
}: HeadingProps) {
  return (
    <h1
      className={cn(
        `text-6xl text-center tracking-tight text-foreground font-black ${variants[varient]}`,
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
