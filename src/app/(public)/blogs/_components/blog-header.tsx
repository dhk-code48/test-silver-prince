import type { SilverPrinceBlog } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type BlogHeaderProps = {
  blog: SilverPrinceBlog;
};

export default function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <header className="space-y-4">
      {/* Title */}
      <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight">
        {blog.title}
      </h1>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
        <time dateTime={blog.createdAt?.toDate().toISOString()}>
          {formatDate(blog.createdAt?.toDate())}
        </time>

        {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
          <span>• Updated: {formatDate(blog.updatedAt?.toDate())}</span>
        )}

        {blog.featured && (
          <Badge variant="secondary" className="ml-2">
            Featured
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xl">{blog.description}</p>
    </header>
  );
}
export function formatDate(date?: Date): string {
  if (!date) return "Unknown date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
