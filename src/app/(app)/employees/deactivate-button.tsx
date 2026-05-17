"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserMinus, Loader2, CheckCircle2 } from "lucide-react";
import { deactivateEmployee } from "@/app/actions";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export function DeactivateButton({ employeeId, employeeName, employeeRole }: { employeeId: string, employeeName: string, employeeRole: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeactivate = async () => {
    setLoading(true);
    const result = await deactivateEmployee(employeeId);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "ghost", size: "sm", className: "text-destructive hover:bg-destructive/10 rounded-lg group cursor-pointer" })}>
          <UserMinus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          Deactivate
        </div>
      </DialogTrigger>
      <DialogContent className="glass border-destructive/20 rounded-3xl sm:max-w-[425px]">
        {success ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Success!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Employee deactivated. <br />
                A replacement job for <strong>{employeeRole}</strong> has been created.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Deactivate Employee?</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                This will set <strong>{employeeName}</strong> as inactive. 
                Our AI will automatically create a new job opening for the <strong>{employeeRole}</strong> role to begin the backfill process.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl flex-1 h-11">Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={handleDeactivate} 
                disabled={loading}
                className="rounded-xl flex-1 h-11 shadow-lg shadow-destructive/20"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Deactivation"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
