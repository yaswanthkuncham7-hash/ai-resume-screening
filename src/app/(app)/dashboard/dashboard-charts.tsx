"use client";

import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import { TrendingUp, Activity } from "lucide-react";

const chartData = [
  { name: "Mon", matches: 28, applied: 40 },
  { name: "Tue", matches: 35, applied: 52 },
  { name: "Wed", matches: 62, applied: 78 },
  { name: "Thu", matches: 48, applied: 60 },
  { name: "Fri", matches: 88, applied: 105 },
  { name: "Sat", matches: 72, applied: 88 },
  { name: "Sun", matches: 90, applied: 110 },
];

const skillData = [
  { name: "React", value: 420, fill: "#6366f1" },
  { name: "Node.js", value: 310, fill: "#06b6d4" },
  { name: "Python", value: 290, fill: "#8b5cf6" },
  { name: "TypeScript", value: 240, fill: "#ec4899" },
  { name: "AWS", value: 180, fill: "#f59e0b" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 rounded-2xl text-sm shadow-2xl border border-border/50">
        <p className="font-bold text-foreground mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="flex items-center gap-2" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            {p.name}: <span className="font-bold ml-1">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  return (
    <>
      {/* Match Activity Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="md:col-span-4"
      >
        <div className="glass-card rounded-3xl p-6 h-[380px] relative overflow-hidden">
          {/* Glow accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg tracking-tight">Match Activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Applied vs AI-matched candidates this week</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              +18.4%
            </div>
          </div>

          <div className="w-full mt-4">
            <ResponsiveContainer width="100%" height={240} minWidth={0}>
            <AreaChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} tick={{ fill: "#94a3b8" }} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} tick={{ fill: "#94a3b8" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applied" name="Applied" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorApplied)" />
              <Area type="monotone" dataKey="matches" name="AI Matched" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMatches)" />
            </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-0.5 bg-indigo-500 rounded-full inline-block" />
              AI Matched
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-0.5 bg-cyan-500 rounded-full inline-block" />
              Applied
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skill Distribution Donut */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="md:col-span-3"
      >
        <div className="glass-card rounded-3xl p-6 h-[380px] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mb-4">
            <h3 className="font-bold text-lg tracking-tight">Skill Demand</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Top skills across all candidates</p>
          </div>

          <div className="w-full mt-4">
            <ResponsiveContainer width="100%" height={220} minWidth={0}>
            <PieChart>
              <Pie
                data={skillData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={78}
                paddingAngle={5}
                dataKey="value"
                strokeWidth={0}
              >
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-2">
            {skillData.slice(0,3).map((skill, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: skill.fill }} />
                  <span className="text-muted-foreground">{skill.name}</span>
                </div>
                <span className="font-bold tabular-nums">{skill.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
