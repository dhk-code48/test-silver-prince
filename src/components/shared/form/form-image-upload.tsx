"use client";

import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

export function FormImageUpload({
  value,
  onChange,
  disabled,
  className,
}: FormImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadSuccess = (result: any) => {
    setIsUploading(false);
    setUploadError(null);

    if (result && typeof result !== "string") {
      if (typeof result.info === "object" && result.info.secure_url) {
        onChange(result.info.secure_url);
      }
    }
  };

  const handleUploadError = () => {
    setIsUploading(false);
    setUploadError("Failed to upload image. Please try again.");
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {uploadError && (
        <div className="bg-destructive/10 p-2 rounded-md text-destructive text-sm">
          {uploadError}
        </div>
      )}

      {value ? (
        <div className="relative border border-border rounded-md overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={value || "/placeholder.svg"}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="top-2 right-2 absolute shadow-sm rounded-full w-8 h-8"
            onClick={handleRemoveImage}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="silver-prince"
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
          onQueuesStart={() => setIsUploading(true)}
        >
          {({ open }) => (
            <div
              onClick={() => !disabled && !isUploading && open()}
              className={cn(
                "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
                !disabled &&
                  !isUploading &&
                  "hover:border-primary/50 hover:bg-muted/50",
                disabled && "opacity-50 cursor-not-allowed",
                isUploading && "border-primary/50 bg-muted/50"
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
                  <p className="text-muted-foreground text-sm">
                    Uploading image...
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-muted/50 p-2 rounded-full">
                    <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-sm">
                    Click to upload an image
                  </p>
                  <p className="text-muted-foreground text-xs">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </>
              )}
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
