"use client";

import type React from "react";

import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdminEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function AdminEmptyState({
  title = "No Data Found",
  description = "There are no items to display at this time.",
  actionLabel = "Create New",
  onAction,
  icon = <FileQuestion className="w-12 h-12 text-muted-foreground/50" />,
}: AdminEmptyStateProps) {
  return (
    <Card className="shadow-md mx-auto border-dashed w-full max-w-md">
      <CardHeader className="pb-4 text-center">
        <div className="bg-muted/50 mx-auto mb-2 p-3 rounded-full w-fit">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 text-muted-foreground text-sm text-center">
        <p>You can create a new item or check back later.</p>
      </CardContent>
      {onAction && (
        <CardFooter className="flex justify-center pt-2">
          <Button onClick={onAction}>{actionLabel}</Button>
        </CardFooter>
      )}
    </Card>
  );
}
