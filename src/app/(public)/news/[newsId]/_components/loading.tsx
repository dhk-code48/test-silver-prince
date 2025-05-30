import { Skeleton } from "@/components/ui/skeleton";

export default function NewsLoading() {
  return (
    <div className="bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
      <Skeleton className="mb-4 w-3/4 h-8" />
      <Skeleton className="mb-8 w-40 h-4" />
      <Skeleton className="mb-8 w-full h-24" />
      <div className="space-y-4">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-5/6 h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
