"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send, Users, BookOpen } from "lucide-react";

export function NotificationSender() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    url: "",
    image: "",
    targetUsers: "all",
    notificationType: "general",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSend = async () => {
    if (!formData.title || !formData.body) {
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);

      if (response.ok) {
        // Reset form on success
        setFormData({
          title: "",
          body: "",
          url: "",
          image: "",
          targetUsers: "all",
          notificationType: "general",
        });
      }
    } catch (error) {
      setResult({ error: "Failed to send notifications" });
    } finally {
      setIsLoading(false);
    }
  };

  const getTargetDescription = () => {
    switch (formData.targetUsers) {
      case "all":
        return "All users with notifications enabled";
      case "chapter-subscribers":
        return "Users subscribed to new chapter notifications";
      default:
        return "Selected users";
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Send Push Notifications
        </CardTitle>
        <CardDescription>
          Send notifications to your users about new chapters, announcements, or updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {result && (
          <Alert variant={result.error ? "destructive" : "default"}>
            <AlertDescription>
              {result.error || `Successfully sent ${result.sentCount} notifications`}
              {result.failedCount > 0 && ` (${result.failedCount} failed)`}
            </AlertDescription>
          </Alert>
        )}

        <div className="gap-4 grid">
          <div className="space-y-2">
            <Label htmlFor="title">Notification Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., New Chapter Available!"
              maxLength={50}
            />
            <p className="text-muted-foreground text-xs">{formData.title.length}/50 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message Body *</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleInputChange("body", e.target.value)}
              placeholder="e.g., Chapter 15 of 'The Silver Prince' is now available to read!"
              maxLength={120}
              rows={3}
            />
            <p className="text-muted-foreground text-xs">{formData.body.length}/120 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Target URL (optional)</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
              placeholder="/novel/chapter-15"
            />
            <p className="text-muted-foreground text-xs">Where users will go when they click the notification</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://example.com/chapter-image.jpg"
            />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetUsers">Target Audience</Label>
              <Select value={formData.targetUsers} onValueChange={(value) => handleInputChange("targetUsers", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      All Users
                    </div>
                  </SelectItem>
                  <SelectItem value="chapter-subscribers">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Chapter Subscribers
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-xs">{getTargetDescription()}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notificationType">Notification Type</Label>
              <Select
                value={formData.notificationType}
                onValueChange={(value) => handleInputChange("notificationType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="chapter">New Chapter</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="mb-2 font-medium">Preview</h4>
          <div className="bg-white shadow-sm p-3 border rounded">
            <div className="flex items-start gap-3">
              <div className="flex flex-shrink-0 justify-center items-center bg-primary rounded-full w-8 h-8">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{formData.title || "Notification Title"}</p>
                <p className="text-muted-foreground text-sm">{formData.body || "Notification message body"}</p>
                <p className="mt-1 text-muted-foreground text-xs">The Silver Prince • now</p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleSend} disabled={isLoading || !formData.title || !formData.body} className="w-full">
          {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          Send Notification
        </Button>
      </CardContent>
    </Card>
  );
}
