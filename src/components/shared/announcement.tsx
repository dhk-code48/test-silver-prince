import { ArrowUpRight, Calendar, Clock, Megaphone } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const EnhancedAnnouncementCard = ({
  to,
  title,
  date,
  description,
  id,
  isLoading = false,
  index = 0,
}: {
  to: string;
  title: string;
  date: Date;
  description: string;
  id: string;
  isLoading?: boolean;
  index?: number;
}) => {
  if (isLoading) {
    return (
      <Card className="group relative bg-card hover:shadow-lg border-border overflow-hidden transition-all animate-pulse duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-muted rounded-lg w-10 h-10" />
            <div className="bg-muted rounded w-16 h-4" />
          </div>
          <div className="bg-muted mb-3 rounded w-3/4 h-6" />
          <div className="space-y-2 mb-4">
            <div className="bg-muted rounded w-full h-4" />
            <div className="bg-muted rounded w-2/3 h-4" />
          </div>
          <div className="bg-muted rounded w-24 h-4" />
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return `${Math.floor(diffInHours / 168)}w ago`;
    }
  };

  return (
    <Card
      className="group relative bg-card hover:shadow-lg hover:border-primary/20 border-border overflow-hidden transition-all hover:-translate-y-1 duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top accent line */}
      <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-primary via-accent to-chart-2 h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 transform" />

      <CardContent className="relative p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent shadow-sm rounded-lg w-10 h-10">
              <Megaphone className="w-5 h-5 text-primary-foreground" />
            </div>
            <Badge variant="secondary" className="bg-accent/50 border-accent/20 text-accent-foreground">
              Announcement
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3 h-3" />
            {getTimeAgo(date)}
          </div>
        </div>

        {/* Title */}
        <Link href={`${to}${id}`}>
          <h3 className="mb-3 font-sans font-bold text-card-foreground group-hover:text-primary text-xl line-clamp-2 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-6 font-sans text-muted-foreground text-sm line-clamp-3 leading-relaxed">{description}</p>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(date)}</span>
          </div>
          <Link
            href={`${to}${id}`}
            className="flex items-center gap-1 group-hover:gap-2 font-medium text-primary text-sm transition-all duration-200"
          >
            <span>Read More</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
