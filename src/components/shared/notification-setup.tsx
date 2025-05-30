"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, BellOff, Smartphone, Monitor, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { notificationService } from "@/lib/notification";

export function NotificationSetup() {
  const { user } = useAuth();
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [preferences, setPreferences] = useState({
    newChapters: false,
    announcements: false,
    comments: false,
  });

  useEffect(() => {
    checkNotificationSupport();
    loadUserPreferences();
  }, [user]);

  const checkNotificationSupport = () => {
    const supported = "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
    }
  };

  const loadUserPreferences = async () => {
    // Load user's notification preferences from Firestore
    // This would be implemented based on your user data structure
  };

  const handleSubscribe = async () => {
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const success = await notificationService.subscribeToNotifications(user.uid);
      if (success) {
        setIsSubscribed(true);
        setPermission("granted");
      }
    } catch (error: any) {
      console.error("Failed to subscribe to notifications:", error);
      setError(error.message || "Failed to enable notifications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const success = await notificationService.unsubscribeFromNotifications(user.uid);
      if (success) {
        setIsSubscribed(false);
      }
    } catch (error: any) {
      console.error("Failed to unsubscribe from notifications:", error);
      setError(error.message || "Failed to disable notifications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = async (key: string, value: boolean) => {
    if (!user) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    await notificationService.updateNotificationPreferences(user.uid, newPreferences);
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Notifications Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Your browser doesn&apos;t support push notifications. Please use a modern browser like Chrome, Firefox, or
              Safari.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Get notified about new chapters, announcements, and updates even when the website is closed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {permission === "denied" && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Notifications are blocked. Please enable them in your browser settings and refresh the page.
              </AlertDescription>
            </Alert>
          )}

          {permission === "default" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex gap-2">
                  <Monitor className="w-5 h-5 text-muted-foreground" />
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Enable Push Notifications</h4>
                  <p className="text-muted-foreground text-sm">
                    Get notified on desktop and mobile, even when the browser is closed
                  </p>
                </div>
                <Button onClick={handleSubscribe} disabled={isLoading}>
                  {isLoading ? "Setting up..." : "Enable"}
                </Button>
              </div>
            </div>
          )}

          {permission === "granted" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-green-50 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Notifications Enabled</h4>
                    <p className="text-green-600 text-sm">You&apos;ll receive push notifications for selected events</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleUnsubscribe} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Disable"}
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="newChapters" className="font-medium">
                        New Chapters
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Get notified when new novel chapters are published
                      </p>
                    </div>
                    <Switch
                      id="newChapters"
                      checked={preferences.newChapters}
                      onCheckedChange={(checked) => handlePreferenceChange("newChapters", checked)}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="announcements" className="font-medium">
                        Announcements
                      </Label>
                      <p className="text-muted-foreground text-sm">Important updates and announcements</p>
                    </div>
                    <Switch
                      id="announcements"
                      checked={preferences.announcements}
                      onCheckedChange={(checked) => handlePreferenceChange("announcements", checked)}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="comments" className="font-medium">
                        Comment Replies
                      </Label>
                      <p className="text-muted-foreground text-sm">When someone replies to your comments</p>
                    </div>
                    <Switch
                      id="comments"
                      checked={preferences.comments}
                      onCheckedChange={(checked) => handlePreferenceChange("comments", checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
