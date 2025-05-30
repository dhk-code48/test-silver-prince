import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted bg-slate-300 dark:bg-slate-900",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
