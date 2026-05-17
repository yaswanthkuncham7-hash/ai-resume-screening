"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Command
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/auth-actions";

const items = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Active Roles", href: "/jobs", icon: Briefcase },
  { name: "Talent Pool", href: "/candidates", icon: Users },
  { name: "Internal Team", href: "/employees", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className={cn(
        "relative flex flex-col h-full bg-card/80 backdrop-blur-2xl border-r border-border/50 transition-all duration-500 ease-in-out z-20 shadow-2xl shadow-black/10 noise-overlay",
        collapsed ? "px-3" : "px-5"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 h-24 px-2 overflow-hidden shrink-0">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-violet-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-primary/20 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
            <Sparkles className="text-primary-foreground h-6 w-6" />
          </div>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col"
            >
              <span className="font-heading font-black text-xl tracking-tighter whitespace-nowrap bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                HireLens AI
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none mt-1">
                Recruiter Hub
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 space-y-1 mt-6">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "group relative flex items-center h-12 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden px-3",
                active 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 translate-x-1" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}>
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-all duration-300 group-hover:scale-110",
                  collapsed ? "mx-auto" : "mr-3",
                  active ? "text-primary-foreground" : "group-hover:text-primary"
                )} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-bold text-sm whitespace-nowrap tracking-tight"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {active && !collapsed && (
                   <motion.div 
                     layoutId="active-indicator"
                     className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full shadow-[0_0_10px_white]"
                   />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pb-10 space-y-3">
        <div className="p-4 glass rounded-2xl border-primary/10 mb-4 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10" />
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Command className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Use <kbd className="px-1 py-0.5 rounded border border-border bg-background font-mono text-[8px]">⌘</kbd> + <kbd className="px-1 py-0.5 rounded border border-border bg-background font-mono text-[8px]">K</kbd> to quickly search candidates.
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            </div>
          )}
        </div>

        <form action={logoutAction}>
          <button type="submit" className={cn(
            "flex items-center w-full h-12 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all px-3 cursor-pointer group overflow-hidden border border-transparent hover:border-rose-500/20",
            collapsed ? "justify-center" : ""
          )}>
            <LogOut className="h-5 w-5 shrink-0 group-hover:-translate-x-1 transition-transform duration-300" />
            {!collapsed && <span className="ml-3 text-sm font-bold tracking-tight">Sign Out</span>}
          </button>
        </form>
      </div>

      {/* Collapse Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-24 h-8 w-8 rounded-full border border-border/50 bg-background shadow-xl z-30 flex items-center justify-center hover:bg-muted transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </motion.button>
    </motion.div>
  );
}
