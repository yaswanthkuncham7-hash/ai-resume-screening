"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, Sparkles, FileText, X, CheckCircle2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { uploadResume } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ResumeUpload({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
      setFile(droppedFile);
    }
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    console.log("Upload triggered", { fileName: file?.name, name });
    e.preventDefault();
    if (!file) {
      console.warn("No file selected");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      setError(null);
      console.log("Calling uploadResume server action...");
      const result = await uploadResume(jobId, formData);
      console.log("Server action result:", result);
      if (result.success) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => {
          setSuccess(false);
          setFile(null);
          setName("");
        }, 3000);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error in component:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="glass-card bg-primary/[0.02] border-primary/20 rounded-[32px] p-8 space-y-8 relative overflow-hidden noise-overlay">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <div className="space-y-2 relative">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <UploadCloud className="h-6 w-6 text-primary" /> Add Candidate
        </h2>
        <p className="text-sm text-muted-foreground font-medium">Upload a resume to begin AI-powered matching and scoring.</p>
      </div>

      <form onSubmit={handleUpload} className="space-y-6 relative">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Candidate Name (Optional)</Label>
          <Input
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-2xl bg-background/50 border-primary/10 focus:border-primary focus:ring-primary/20 transition-all font-bold placeholder:font-normal"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Resume File</Label>
          
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={cn(
                  "relative group cursor-pointer border-2 border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center gap-4 transition-all duration-500",
                  isDragging 
                    ? "border-primary bg-primary/5 scale-[1.02] shadow-2xl" 
                    : "border-primary/20 hover:border-primary/40 hover:bg-primary/[0.03]"
                )}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-bold text-sm">Drop your file here</p>
                  <p className="text-[11px] text-muted-foreground font-medium">PDF or DOCX accepted (Max 10MB)</p>
                </div>
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept=".pdf,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative glass rounded-2xl p-4 border-primary/30 bg-primary/5 flex items-center justify-between group overflow-hidden"
              >
                <div className="absolute inset-0 bg-shimmer pointer-events-none" />
                <div className="flex items-center gap-3 relative">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold truncate max-w-[150px]">{file.name}</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setFile(null)}
                  className="h-8 w-8 rounded-full hover:bg-rose-500/20 hover:text-rose-500 relative transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button 
          type="submit"
          disabled={!file || loading} 
          className={cn(
            "w-full h-14 rounded-2xl font-black text-lg shadow-xl transition-all duration-500 relative overflow-hidden group",
            success ? "bg-emerald-500 hover:bg-emerald-500" : "bg-primary hover:bg-primary/90 shadow-primary/20"
          )}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Processing AI...
              </motion.div>
            ) : success ? (
              <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Candidate Added!
              </motion.div>
            ) : (
              <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" /> Upload & Match
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Button>
        {error && (
          <p className="text-sm text-red-500 font-medium text-center pt-1">{error}</p>
        )}
      </form>
    </div>
  );
}
