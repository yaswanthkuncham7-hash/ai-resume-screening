"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, PartyPopper } from "lucide-react";
import { hireCandidate, rejectCandidate } from "@/app/actions";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export function CandidateActions({ candidateId, jobId, candidateName }: { candidateId: string, jobId: string, candidateName: string }) {
  const [loading, setLoading] = useState(false);
  const [hired, setHired] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handleHire = async () => {
    setLoading(true);
    const result = await hireCandidate(candidateId, jobId);
    setLoading(false);
    if (result.success) {
      setHired(true);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    const result = await rejectCandidate(candidateId, jobId);
    setLoading(false);
    if (result.success) {
      setRejected(true);
    }
  };

  if (hired) {
    return (
      <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-2xl border border-emerald-500/20 animate-in zoom-in-95">
        <PartyPopper className="h-6 w-6" />
        <span className="font-bold">Candidate Hired & Added to Team!</span>
      </div>
    );
  }

  if (rejected) {
    return (
      <div className="flex items-center gap-3 bg-destructive/10 text-destructive px-6 py-3 rounded-2xl border border-destructive/20">
        <XCircle className="h-6 w-6" />
        <span className="font-bold">Candidate Rejected</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger>
          <div className={buttonVariants({ variant: "outline", className: "rounded-xl h-12 px-6 border-destructive/30 text-destructive hover:bg-destructive/10 cursor-pointer flex items-center" })}>
            <XCircle className="mr-2 h-5 w-5" /> Reject
          </div>
        </DialogTrigger>
        <DialogContent className="glass rounded-3xl">
          <DialogHeader>
            <DialogTitle>Reject Candidate?</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject <strong>{candidateName}</strong> for this position?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3">
             <Button variant="destructive" onClick={handleReject} disabled={loading} className="rounded-xl flex-1">
               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Rejection"}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <div className={buttonVariants({ className: "rounded-xl h-12 px-8 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center" })}>
            <CheckCircle2 className="mr-2 h-5 w-5" /> Hire Candidate
          </div>
        </DialogTrigger>
        <DialogContent className="glass border-emerald-500/20 rounded-3xl">
          <DialogHeader>
            <DialogTitle>Hire {candidateName}?</DialogTitle>
            <DialogDescription>
              By hiring this candidate, they will automatically be added to your **Internal Team** and their status will be updated in the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3">
             <Button onClick={handleHire} disabled={loading} className="rounded-xl flex-1 bg-emerald-500 hover:bg-emerald-600 h-11">
               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm & Hire"}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
