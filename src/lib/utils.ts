import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unstable_cache } from "next/cache";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ===== CACHE ===== //

export function createCachedFetcher<T, Args extends any[]>(
  fetchFn: (...args: Args) => Promise<T>,
  keyGenerator: (...args: Args) => string[],
  options: {
    revalidate?: number | false;
    tags?: string[];
  } = {}
) {
  return (...args: Args) => {
    const cacheKey = keyGenerator(...args);
    const cachedFn = unstable_cache(
      async () => {
        try {
          return await fetchFn(...args);
        } catch (error) {
          console.error("Error in cached fetcher:", error);
          throw error;
        }
      },
      cacheKey,
      options
    );
    return cachedFn();
  };
}
