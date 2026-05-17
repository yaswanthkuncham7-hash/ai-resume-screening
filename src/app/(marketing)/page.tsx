"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BrainCircuit, Users2, ShieldCheck, Zap, Globe, BarChart3, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden font-sans noise-overlay">
      {/* Cinematic Navigation */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-16 fixed w-full z-50 glass-dark border-b border-white/5 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-2xl">
              <Sparkles className="text-primary-foreground h-6 w-6 animate-pulse" />
            </div>
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white">HireLens AI</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.15em] text-white/60">
          <Link href="#features" className="hover:text-primary transition-all duration-300 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#how-it-works" className="hover:text-primary transition-all duration-300 relative group">
            Process
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#pricing" className="hover:text-primary transition-all duration-300 relative group">
            Insights
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/5 font-bold tracking-tight">Login</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_oklch(0.62_0.24_268)] px-6 rounded-xl font-bold">
              Join Now <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-48 px-6">
        {/* Futuristic Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[60rem] h-[60rem] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-[0%] right-[-5%] w-[50rem] h-[50rem] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-background" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-12 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-4 shadow-2xl"
          >
            <Zap className="h-4 w-4 fill-primary" /> The Future of Technical Recruiting
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-heading font-black tracking-tighter text-white leading-[0.9] drop-shadow-2xl"
          >
            SCREENING AT <br />
            <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-300 bg-clip-text text-transparent animate-gradient-x px-4 italic">
              LIGHTSPEED.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg md:text-2xl text-white/50 leading-tight font-medium tracking-tight"
          >
            Stop the manual grind. HireLens AI automates resume parsing, deep-skill evaluation, and candidate ranking with pinpoint accuracy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 pt-6"
          >
            <Link href="/login">
              <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl bg-primary hover:bg-primary/90 text-white glow-primary hover:scale-105 transition-all duration-500 group">
                Enter App <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black rounded-2xl glass border-white/10 text-white hover:bg-white/5 transition-all duration-500">
              Watch Vision
            </Button>
          </motion.div>

          {/* Floating Feature Icons */}
          <div className="absolute hidden 2xl:block top-1/4 -left-12 animate-float">
            <div className="glass-card p-4 rounded-3xl border-primary/20 rotate-[-6deg]">
               <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="absolute hidden 2xl:block top-1/3 -right-12 animate-float delay-1000">
            <div className="glass-card p-4 rounded-3xl border-cyan-500/20 rotate-[12deg]">
               <BarChart3 className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Feature Section */}
      <section id="features" className="py-32 px-6 relative bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter leading-none">THE AI ENGINE <br /><span className="text-primary">YOUR ATS DESERVES.</span></h2>
                <p className="text-xl text-muted-foreground font-medium tracking-tight">HireLens doesn't just read resumes; it understands context, project complexity, and seniority levels like a veteran CTO.</p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Globe, title: "Universal Parsing", desc: "Supports PDF, DOCX, and raw text with semantic intelligence." },
                  { icon: ShieldCheck, title: "Bias-Free Evaluation", desc: "Automated scoring based strictly on job criteria and skill match." },
                  { icon: Users2, title: "Recruiter Efficiency", desc: "Reduce initial screening time by 85% without sacrificing quality." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group cursor-default">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center border-primary/10 group-hover:border-primary/50 transition-all duration-500 group-hover:bg-primary/5">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-black tracking-tight text-lg uppercase">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse-slow" />
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative glass-card rounded-[40px] border-white/5 overflow-hidden shadow-2xl p-2 bg-black/40"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Feature Preview"
                  className="rounded-[32px] opacity-80 brightness-110 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border/50 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Sparkles className="text-primary h-8 w-8" />
              <span className="font-heading font-black text-2xl tracking-tighter text-white">HireLens AI</span>
            </div>
            <p className="text-white/40 text-sm font-medium tracking-tight max-w-xs">Pioneering the next era of intelligent talent acquisition.</p>
          </div>
          
          <div className="flex gap-12">
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Connect</h5>
              <div className="flex flex-col gap-3 text-sm font-bold text-white/50">
                <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
                <Link href="#" className="hover:text-primary transition-colors">Github</Link>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Legal</h5>
              <div className="flex flex-col gap-3 text-sm font-bold text-white/50">
                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">© 2026 HireLens AI platform. All rights reserved.</p>
           <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Engine Status: Optimized</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
