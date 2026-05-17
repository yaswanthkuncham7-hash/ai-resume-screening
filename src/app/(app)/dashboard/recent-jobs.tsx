"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RecentJobs({ jobs }: { jobs: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-heading">Recent Job Openings</CardTitle>
            <CardDescription>Monitor your active roles</CardDescription>
          </div>
          <Link href="/jobs">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No jobs created yet.</p>
            ) : (
              jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-all border border-transparent hover:border-border/50 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.count || 0} candidates matched</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.status === 'Active' || !job.status ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                         {job.status || 'Active'}
                       </span>
                       <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
