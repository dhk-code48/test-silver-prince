"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, Lock, Mail, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { NotificationSetup } from "@/components/shared/notification-setup";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

function ProfileContent() {
  const { user, updateUserProfile, changePassword, sendEmailVerification } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsUpdatingProfile(true);

    try {
      await updateUserProfile(displayName);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSendVerification = async () => {
    setError("");
    setSuccess("");
    setIsSendingVerification(true);

    try {
      await sendEmailVerification();
      setSuccess("Verification email sent!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSendingVerification(false);
    }
  };

  return (
    <MaxWidthWrapper small className="font-rubik">
      <div className="space-y-6 mt-10">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
              </div>

              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Email Verification */}
        {user && !user.emailVerified && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Verification
              </CardTitle>
              <CardDescription>Your email address is not verified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Verify your email to access all features</p>
                </div>
                <Button onClick={handleSendVerification} disabled={isSendingVerification} variant="outline">
                  {isSendingVerification && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                  Send Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Change Password */}
        {user?.providerData[0]?.providerId === "password" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
            <CardDescription>Your account security information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-muted-foreground text-sm">{user?.emailVerified ? "Verified" : "Not verified"}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    user?.emailVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user?.emailVerified ? "Verified" : "Pending"}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Sign-in Method</p>
                  <p className="text-muted-foreground text-sm">
                    {user?.providerData[0]?.providerId === "password"
                      ? "Email and Password"
                      : user?.providerData[0]?.providerId === "google.com"
                      ? "Google"
                      : user?.providerData[0]?.providerId === "facebook.com"
                      ? "Facebook"
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <NotificationSetup />

        {/* Account Security */}
        <Card>
          <CardContent className="flex justify-between items-center p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 font-semibold text-xl">
                <LogOut className="w-5 h-5" />
                LogOut
              </div>
              <p>Log Out from your current account</p>
            </div>
            <Button onClick={() => signOut(auth)}>SignOut</Button>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute requireEmailVerification={false}>
      <ProfileContent />
    </ProtectedRoute>
  );
}
