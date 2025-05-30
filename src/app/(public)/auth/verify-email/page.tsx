"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, CheckCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState("");

  const { user, sendEmailVerification, checkEmailVerification } = useAuth();

  useEffect(() => {
    // Check verification status periodically
    const interval = setInterval(async () => {
      if (user && !user.emailVerified) {
        await checkEmailVerification();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, checkEmailVerification]);

  const handleResendEmail = async () => {
    setError("");
    setIsResending(true);
    setResendSuccess(false);

    try {
      await sendEmailVerification();
      setResendSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  if (user?.emailVerified) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 min-h-screen">
        <Card className="shadow-xl w-full max-w-md">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div>
              <CardTitle className="font-bold text-2xl">Email Verified!</CardTitle>
              <CardDescription>Your email has been successfully verified</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Link href="/novel">
              <Button className="w-full">Continue to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 min-h-screen">
      <Card className="shadow-xl w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Image src="/logo.png" width={80} height={80} alt="The Silver Prince Logo" className="rounded-full" />
          </div>
          <div>
            <CardTitle className="font-bold text-2xl">Verify Your Email</CardTitle>
            <CardDescription>We&apos;ve sent a verification link to {user?.email}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>Verification email sent successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <Mail className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              Click the link in your email to verify your account. The page will automatically update once verified.
            </p>
          </div>

          <Button onClick={handleResendEmail} variant="outline" className="w-full" disabled={isResending}>
            {isResending ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <RefreshCw className="mr-2 w-4 h-4" />}
            Resend Verification Email
          </Button>

          <div className="text-sm text-center">
            <Link href="/auth/signin" className="text-primary hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
