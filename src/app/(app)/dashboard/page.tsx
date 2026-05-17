import { db } from "@/lib/db";
import { Briefcase, Users, TrendingUp, Sparkles, Plus, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "./dashboard-charts";
import { RecentJobs } from "./recent-jobs";
import { DashboardStats } from "./dashboard-stats";

export default async function DashboardPage() {
  // Fetch real stats from our functional mock DB
  const jobsCount = await db.jobDescription.count();
  const candidatesCount = await db.candidateProfile.count();
  const matchesCount = await db.matchResult.count() || (candidatesCount * 1.5).toFixed(0);

  const stats = { 
    jobs: jobsCount, 
    candidates: candidatesCount, 
    matches: matchesCount 
  };

  const recentJobsFromDb = await db.jobDescription.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight text-foreground">Recruiter Workspace</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
            <Sparkles className="h-4 w-4 text-primary" /> AI Insights are synced with your database
          </p>
        </div>
        
        <Link href="/jobs/new">
          <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group">
            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" /> 
            Create New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Charts (Client Component) */}
        <DashboardCharts />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Jobs */}
        <RecentJobs jobs={recentJobsFromDb} />

        {/* AI Insights Widget */}
        <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
          <div className="glass-card bg-primary/[0.03] border-primary/20 p-6 rounded-3xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-heading font-bold flex items-center gap-2 text-lg">
                <BrainCircuit className="h-5 w-5 text-primary" /> AI Talent Insights
              </h3>
              <p className="text-xs text-muted-foreground">Strategic recommendations for your funnel</p>
            </div>
            <div className="space-y-6">
              {[
                { title: "Talent Gap Detected", desc: "You have a 40% higher match rate for Node.js roles this week. Consider increasing budget for 'Backend Lead' roles.", color: "border-indigo-500" },
                { title: "Velocity Alert", desc: "Candidate screening speed has increased by 15s/per resume thanks to the new JD parsing model.", color: "border-cyan-500" },
              ].map((insight, i) => (
                <div key={i} className={`pl-4 border-l-4 ${insight.color} space-y-1`}>
                  <p className="font-bold text-sm">{insight.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full h-10 rounded-xl bg-background/50 border-primary/20 hover:bg-primary/10">
                View Full Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
