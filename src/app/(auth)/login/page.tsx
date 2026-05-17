"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Command, Globe } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 relative"
      >
        <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Top Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Sparkles className="text-primary-foreground h-6 w-6" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">HireLens</span>
            </Link>
            <h1 className="text-2xl font-heading font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your recruiter workspace</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Link href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all rounded-xl"
              />
            </div>
          </div>

          <Link href="/dashboard">
            <Button className="w-full h-12 text-md font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl mt-4 group">
              Sign in <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl bg-background/50 border-border/50 hover:bg-muted transition-all">
              <Command className="mr-2 h-5 w-5" /> GitHub
            </Button>
            <Button variant="outline" className="h-12 rounded-xl bg-background/50 border-border/50 hover:bg-muted transition-all">
              <Globe className="mr-2 h-5 w-5" /> Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Don't have an account?{" "}
            <Link href="#" className="font-semibold text-primary hover:underline">Request early access</Link>
          </p>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl -z-10" />
      </motion.div>
    </div>
  );
}
