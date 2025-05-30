"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 min-h-screen">
        <Card className="shadow-xl w-full max-w-md">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div>
              <CardTitle className="font-bold text-2xl">Check Your Email</CardTitle>
              <CardDescription>We&apos;ve sent a password reset link to {email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-muted-foreground text-sm text-center">
              Didn&apos;t receive the email? Check your spam folder or
              <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setSuccess(false)}>
                try again
              </Button>
            </div>

            <Link href="/auth/signin">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Sign In
              </Button>
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
            <CardTitle className="font-bold text-2xl">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="top-3 left-3 absolute w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>

          <Link href="/auth/signin">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
