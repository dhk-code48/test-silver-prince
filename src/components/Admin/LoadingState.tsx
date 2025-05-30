"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Progress } from "@/components/ui/progress";

interface AdminLoadingStateProps {
  title?: string;
  description?: string;
  loadingMessage?: string;
  showProgressBar?: boolean;
}

export function AdminLoadingState({
  title = "Loading Data",
  description = "Please wait while we fetch the latest information",
  loadingMessage = "Retrieving data from the server...",
  showProgressBar = true,
}: AdminLoadingStateProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    const timer2 = setTimeout(() => setProgress(87), 1500);
    const timer3 = setTimeout(() => setProgress(95), 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-12 w-full">
      <Card className="shadow-lg mx-auto border-muted/40 w-full max-w-md">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <LoadingSpinner size="sm" />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col space-y-4">
            {showProgressBar && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-muted-foreground text-xs text-right">
                  {progress}%
                </p>
              </div>
            )}

            <div className="flex items-center space-x-4 py-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="relative bg-card p-2 rounded-full">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm leading-none">
                  {loadingMessage}
                </p>
                <p className="text-muted-foreground text-xs">
                  This may take a few moments
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 text-muted-foreground text-xs">
          <p>
            You can safely navigate away from this page. We&apos;ll keep working
            in the background.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
