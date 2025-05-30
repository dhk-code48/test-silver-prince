"use client";

import { NotificationSender } from "@/components/shared/notification-sender";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Bell } from "lucide-react";

function AdminContent() {
  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="space-y-6">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex justify-center items-center bg-primary/10 rounded-full w-16 h-16">
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-3xl">Notification Management</h1>
            <p className="text-muted-foreground">
              Send push notifications to your users about new chapters and updates
            </p>
          </div>
        </div>

        <Alert>
          <Shield className="w-4 h-4" />
          <AlertDescription>
            This is an admin panel for sending push notifications. Make sure you have proper permissions to access this
            area.
          </AlertDescription>
        </Alert>

        <NotificationSender />

        <Card>
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
            <CardDescription>Best practices for sending notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="gap-4 grid">
              <div>
                <h4 className="font-medium">New Chapter Notifications</h4>
                <p className="text-muted-foreground text-sm">
                  Send these when you publish new novel chapters. Use &quot;Chapter Subscribers&quot; as the target
                  audience.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Announcements</h4>
                <p className="text-muted-foreground text-sm">
                  Use for important updates, website changes, or special events. Target &quotAll Users&quot for maximum
                  reach.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Timing</h4>
                <p className="text-muted-foreground text-sm">
                  Consider your audience&apos;s time zones. Notifications sent during peak reading hours get better
                  engagement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminNotificationsPage() {
  return (
    <ProtectedRoute requireEmailVerification={true} requireAdmin={true}>
      <AdminContent />
    </ProtectedRoute>
  );
}
