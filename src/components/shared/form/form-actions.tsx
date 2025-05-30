"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  isSubmitting: boolean;
  submitText?: string;
  submittingText?: string;
  showReset?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  align?: "left" | "center" | "right";
}

export function FormActions({
  isSubmitting,
  submitText = "Submit",
  submittingText = "Submitting...",
  showReset = false,
  cancelText = "Cancel",
  onCancel: onCancel,
  className,
  align = "right",
}: FormActionsProps) {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={cn("flex gap-2 pt-4", alignmentClasses[align], className)}>
      {showReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelText}
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            {submittingText}
          </>
        ) : (
          submitText
        )}
      </Button>
    </div>
  );
}
