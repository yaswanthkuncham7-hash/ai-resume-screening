"use client";

import { useState } from "react";
import { createJobDescription } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewJobPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createJobDescription(formData);
      // If success, the action redirects automatically.
    } catch (error) {
      console.error(error);
      alert("Failed to create job description.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Job</CardTitle>
          <CardDescription>
            Paste the job description text below. Our AI will automatically extract the key skills and requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              name="text"
              placeholder="Paste job description here..."
              className="min-h-[300px]"
              required
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze and Create Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
