"use client";

import type React from "react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireEmailVerification = false,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/auth/signin");
        return;
      }

      if (requireEmailVerification && user && !user.emailVerified) {
        router.push("/auth/verify-email");
        return;
      }

      // Add admin check if needed
      if (requireAdmin && user) {
        if (
          user.uid !== process.env.NEXT_PUBLIC_KEY1 &&
          user.uid !== process.env.NEXT_PUBLIC_KEY2 &&
          user.uid !== process.env.NEXT_PUBLIC_KEY3
        ) {
          router.push("/novel");
        }
      }
    }
  }, [isLoggedIn, isLoading, user, router, requireEmailVerification, requireAdmin]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto w-8 h-8 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  if (requireEmailVerification && user && !user.emailVerified) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">Redirecting to email verification...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
