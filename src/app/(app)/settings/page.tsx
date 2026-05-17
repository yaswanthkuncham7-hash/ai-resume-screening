"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Shield, User, Sparkles, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-heading font-extrabold tracking-tight">Workspace Settings</h1>
        <p className="text-muted-foreground text-sm flex items-center gap-2">
          <SettingsIcon className="h-4 w-4" /> Manage your recruitment preferences and AI configuration
        </p>
      </div>

      <div className="grid gap-8">
        {/* Profile Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                   <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Recruiter Profile</CardTitle>
                  <CardDescription>Your personal information and workspace identity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold tracking-wider text-muted-foreground ml-1">Display Name</Label>
                  <Input placeholder="Recruiter Name" defaultValue="Recruiter Admin" className="bg-background/50 rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold tracking-wider text-muted-foreground ml-1">Work Email</Label>
                  <Input placeholder="email@company.com" defaultValue="admin@hirelens.ai" className="bg-background/50 rounded-xl h-11" />
                </div>
              </div>
              <Button className="rounded-xl px-6 h-11 bg-primary hover:bg-primary/90">Update Profile</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Configuration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card border-primary/20 bg-primary/[0.02]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-500/10">
                   <Sparkles className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Matching Engine</CardTitle>
                  <CardDescription>Configure how AI evaluates and ranks candidates</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-background/40 border border-border/50">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Explainable AI Scoring</p>
                  <p className="text-xs text-muted-foreground">Generate detailed reasoning for every candidate rank</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-background/40 border border-border/50">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Strict Skill Matching</p>
                  <p className="text-xs text-muted-foreground">Only rank candidates that meet 100% of required skills</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold tracking-wider text-muted-foreground ml-1">AI Insight Model</Label>
                <div className="p-3 rounded-xl bg-background/50 border border-border/50 text-sm font-medium">
                  GPT-4o Recruitment Optimized (Current)
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications & Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-md flex items-center gap-2 font-bold">
                  <Bell className="h-4 w-4 text-primary" /> Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-sm">Email Alerts for High Matches</span>
                   <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-sm">Daily Hiring Summaries</span>
                   <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-md flex items-center gap-2 font-bold">
                  <Shield className="h-4 w-4 text-emerald-500" /> Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-sm">Two-Factor Authentication</span>
                   <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                </div>
                <Button variant="outline" className="w-full rounded-xl text-xs h-9">Update Credentials</Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Database & Export */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card border-destructive/20">
            <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2">
                 <Database className="h-5 w-5 text-muted-foreground" /> Data Management
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="rounded-xl flex-1 h-11 border-border/50">Export Workspace Data (CSV)</Button>
                <Button variant="destructive" className="rounded-xl flex-1 h-11 shadow-lg shadow-destructive/20">Delete All Candidates</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
