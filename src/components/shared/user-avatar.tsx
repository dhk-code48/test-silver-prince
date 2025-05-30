import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function UserAvatar({
  displayName,
  photoURL,
  size = "default",
}: {
  displayName?: string | null;
  photoURL?: string | null;
  size?: "large" | "default" | "small";
}) {
  return (
    <Avatar
      className={cn("border-4 border-primary/20", {
        "w-24 h-24": size === "large",
      })}
    >
      <AvatarImage src={photoURL || ""} alt={displayName || ""} />
      <AvatarFallback
        className={cn("bg-gradient-to-br from-primary to-accent font-bold text-primary-foreground", {
          "text-2xl": size === "large",
        })}
      >
        {getInitials(displayName || "User")}
      </AvatarFallback>
    </Avatar>
  );
}
