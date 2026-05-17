"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <Button
        onClick={reset}
        className="rounded-xl h-11 px-6"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
