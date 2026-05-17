"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";

export function DashboardStats({ stats }: { stats: any }) {
  const cards = [
    { 
      title: "Open Roles", 
      value: stats.jobs, 
      icon: Briefcase, 
      color: "text-indigo-500", 
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      glow: "shadow-indigo-500/5",
      trend: "+4 new this week"
    },
    { 
      title: "Total Candidates", 
      value: stats.candidates, 
      icon: Users, 
      color: "text-cyan-500", 
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      glow: "shadow-cyan-500/5",
      trend: "+12% growth"
    },
    { 
      title: "AI Match Rate", 
      value: stats.matches + "%", 
      icon: Sparkles, 
      color: "text-violet-500", 
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      glow: "shadow-violet-500/5",
      trend: "High accuracy"
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="relative group"
        >
          <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.glow.replace('shadow', 'bg')}`} />
          <div className={`relative glass-card border ${stat.border} p-6 rounded-3xl h-full overflow-hidden noise-overlay flex flex-col justify-between`}>
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="h-8 w-8 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            
            <div className="mt-8 space-y-1">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-heading font-extrabold tracking-tight">{stat.value}</h3>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="mr-1 h-3 w-3" /> {stat.trend}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium italic">vs last month</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
