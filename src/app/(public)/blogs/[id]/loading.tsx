import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="space-y-8 mx-auto px-4 py-12 max-w-4xl container">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-12" />
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-full h-8" />
      </div>

      {/* Banner skeleton */}
      <Skeleton className="rounded-lg w-full h-[400px]" />

      {/* Content skeleton */}
      <div className="space-y-4">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-5/6 h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-2/3 h-6" />
      </div>
    </div>
  );
}
