"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setShowConsent(false);
  };

  const acceptSelected = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        ...preferences,
        timestamp: new Date().toISOString(),
      })
    );
    setShowConsent(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="right-0 bottom-0 left-0 z-50 fixed p-4">
      <Card className="shadow-lg mx-auto border-2 max-w-4xl">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Cookie className="flex-shrink-0 mt-1 w-6 h-6 text-primary" />
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold text-lg">We use cookies</h3>
                  <p className="mb-4 text-muted-foreground text-sm">
                    We use cookies to enhance your browsing experience, provide personalized content, and analyze our
                    traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can manage your
                    preferences or learn more in our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={acceptAll} className="bg-primary">
                      Accept All
                    </Button>
                    <Button onClick={rejectAll} variant="outline">
                      Reject All
                    </Button>
                    <Button onClick={() => setShowSettings(true)} variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" />
                      Customize
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowConsent(false)} className="flex-shrink-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Cookie Preferences</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Essential Cookies</h4>
                    <p className="text-muted-foreground text-sm">Required for website functionality and security</p>
                  </div>
                  <div className="text-muted-foreground text-sm">Always Active</div>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-muted-foreground text-sm">Help us understand how you use our website</p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          analytics: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Enable</span>
                  </label>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Marketing Cookies</h4>
                    <p className="text-muted-foreground text-sm">Used to deliver relevant advertisements</p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          marketing: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Enable</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={acceptSelected} className="flex-1">
                  Save Preferences
                </Button>
                <Button onClick={acceptAll} variant="outline" className="flex-1">
                  Accept All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
