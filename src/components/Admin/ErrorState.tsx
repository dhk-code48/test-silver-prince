"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, RefreshCw, Send } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";

interface AdminErrorStateProps {
  title?: string;
  description?: string;
  error?: Error | { code: string; message: string } | string;
  onRetry?: () => void;
  showReportOption?: boolean;
}

export function AdminErrorState({
  title = "Error Loading Data",
  description = "We encountered a problem while fetching your data",
  error,
  onRetry,
  showReportOption = true,
}: AdminErrorStateProps) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [reportText, setReportText] = useState("");

  const errorMessage = (() => {
    if (!error) return "An unknown error occurred";
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    if ("message" in error) return error.message;
    return String(error);
  })();

  const errorCode =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "string"
      ? (error as any).code
      : null;

  const handleSendReport = () => {
    // In a real app, you would send this report to your error tracking system
    console.log("Sending error report:", { error, reportText });
    setReportSent(true);
  };

  return (
    <div className="flex flex-col justify-center items-center py-12 w-full">
      <Card className="shadow-lg mx-auto border-destructive/20 w-full max-w-md">
        <CardHeader className="space-y-1 pb-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-destructive/10 p-1 rounded-full">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <Alert variant="destructive" className="mb-4">
            <AlertTitle className="flex items-center gap-2">
              {errorCode && (
                <span className="bg-destructive/10 px-2 py-0.5 rounded font-mono text-destructive text-xs">
                  {errorCode}
                </span>
              )}
              Error Details
            </AlertTitle>
            <AlertDescription className="mt-1 font-mono text-xs">
              {errorMessage}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium text-sm">Possible Solutions:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                <li>Check your internet connection</li>
                <li>Verify you have the necessary permissions</li>
                <li>Try refreshing the page</li>
                <li>Contact your administrator if the problem persists</li>
              </ul>
            </div>

            {showReportOption && (
              <Collapsible
                open={isReportOpen}
                onOpenChange={setIsReportOpen}
                className="mt-4"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-between w-full"
                  >
                    {reportSent ? "Report Sent" : "Report This Issue"}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        isReportOpen ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  {!reportSent ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Please describe what you were doing when this error occurred..."
                        className="min-h-[100px]"
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                      />
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleSendReport}
                        disabled={reportText.length < 10}
                      >
                        <Send className="mr-2 w-4 h-4" />
                        Send Report
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-primary/10 p-3 rounded text-primary text-sm">
                      Thank you for your report. Our team has been notified and
                      will investigate this issue.
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          {onRetry && (
            <Button onClick={onRetry}>
              <RefreshCw className="mr-2 w-4 h-4" />
              Retry
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
