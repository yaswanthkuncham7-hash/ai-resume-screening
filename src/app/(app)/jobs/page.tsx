/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function JobsPage() {
  let jobs: any[] = [];
  
  try {
    jobs = await db.jobDescription.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("DB error, using mock data");
    jobs = [
      { id: "mock-1", title: "Senior Frontend Engineer", experienceRequired: "5+ years", createdAt: new Date(), status: "Active" },
      { id: "mock-2", title: "Product Manager", experienceRequired: "3+ years", createdAt: new Date(), status: "Draft" },
      { id: "mock-3", title: "Backend Architect", experienceRequired: "8+ years", createdAt: new Date(), status: "Closed" },
    ];
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight">Active Roles</h1>
          <p className="text-muted-foreground text-sm">Manage and monitor your job descriptions</p>
        </div>
        <Link href="/jobs/new" className={buttonVariants({ className: "h-11 rounded-xl shadow-lg shadow-primary/20" })}>
          <Plus className="mr-2 h-5 w-5" />
          Create Job
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search jobs by title or skill..." className="pl-10 h-11 bg-card/50 rounded-xl" />
        </div>
        <button className="h-11 px-4 border border-border/50 rounded-xl bg-card/50 hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-0">
          {jobs.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No jobs found in your workspace.</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold py-4">Position Title</TableHead>
                  <TableHead className="font-bold py-4">Status</TableHead>
                  <TableHead className="font-bold py-4">Exp. Level</TableHead>
                  <TableHead className="font-bold py-4">Created At</TableHead>
                  <TableHead className="font-bold py-4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className="border-border/40 hover:bg-muted/30 transition-colors group">
                    <TableCell className="font-bold text-sm py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Briefcase className="h-4 w-4 text-primary" />
                         </div>
                         {job.title}
                       </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                        job.status === 'Draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'
                      }`}>
                        {job.status || 'Active'}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground font-medium">{job.experienceRequired}</TableCell>
                    <TableCell className="py-4 text-muted-foreground">{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right py-4 pr-6">
                      <Link href={`/jobs/${job.id}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "rounded-lg" })}>
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
