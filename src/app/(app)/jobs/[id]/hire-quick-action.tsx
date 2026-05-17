"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle2, Loader2, UserCheck } from "lucide-react";
import { hireCandidate } from "@/app/actions";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export function HireQuickAction({ candidateId, jobId, candidateName }: { candidateId: string, jobId: string, candidateName: string }) {
  const [loading, setLoading] = useState(false);
  const [hired, setHired] = useState(false);

  const handleHire = async () => {
    setLoading(true);
    const result = await hireCandidate(candidateId, jobId);
    setLoading(false);
    if (result.success) {
      setHired(true);
    }
  };

  if (hired) {
    return (
      <Button variant="ghost" size="sm" className="text-emerald-500 font-bold bg-emerald-500/10 rounded-lg">
        <CheckCircle2 className="h-4 w-4 mr-2" /> Hired
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className={buttonVariants({ size: "sm", className: "bg-emerald-500 hover:bg-emerald-600 rounded-lg cursor-pointer" })}>
          <UserCheck className="h-4 w-4 mr-2" /> Quick Hire
        </div>
      </DialogTrigger>
      <DialogContent className="glass rounded-3xl">
        <DialogHeader>
          <DialogTitle>Hire {candidateName}?</DialogTitle>
          <DialogDescription>
            Confirming this will immediately add them to your Internal Team.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button onClick={handleHire} disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 h-11 rounded-xl">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Hire"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
