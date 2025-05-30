import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormStatusProps {
  status: "success" | "error" | "info" | null;
  message: string | null;
  className?: string;
}

export function FormStatus({ status, message, className }: FormStatusProps) {
  if (!status || !message) return null;

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      title: "Success",
      variant: "success" as const,
      iconClass: "text-green-500",
    },
    error: {
      icon: XCircle,
      title: "Error",
      variant: "destructive" as const,
      iconClass: "text-destructive",
    },
    info: {
      icon: AlertCircle,
      title: "Info",
      variant: "default" as const,
      iconClass: "text-blue-500",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Alert
      variant={config.variant}
      className={cn("animate-in fade-in-50 duration-300", className)}
    >
      <Icon className={cn("h-4 w-4", config.iconClass)} />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
