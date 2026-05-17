/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, Sparkles, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function CandidatesPage() {
  let candidates: any[] = [];
  
  try {
    candidates = await db.candidateProfile.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("DB error, using mock data");
    candidates = [
      { id: "c1", name: "Alice Smith", email: "alice@example.com", skills: ["React", "TypeScript", "Node.js"], score: 94 },
      { id: "c2", name: "Bob Jones", email: "bob@example.com", skills: ["Python", "Django", "AWS"], score: 82 },
      { id: "c3", name: "Charlie Davis", email: "charlie@company.org", skills: ["Java", "Spring Boot", "SQL"], score: 65 },
    ];
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight">Talent Pool</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Users className="h-4 w-4" /> Global candidate database
          </p>
        </div>
        <Link href="/jobs" className={buttonVariants({ className: "h-11 rounded-xl shadow-lg shadow-primary/20" })}>
          <Plus className="mr-2 h-5 w-5" />
          Add Candidate
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, skill, or experience..." className="pl-10 h-11 bg-card/50 rounded-xl" />
        </div>
        <button className="h-11 px-4 border border-border/50 rounded-xl bg-card/50 hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-0">
          {candidates.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No candidates parsed yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold py-4">Candidate</TableHead>
                  <TableHead className="font-bold py-4">Avg. Score</TableHead>
                  <TableHead className="font-bold py-4">Key Skills</TableHead>
                  <TableHead className="font-bold py-4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id} className="border-border/40 hover:bg-muted/30 transition-colors group">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                          {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                       <div className="flex items-center gap-2">
                         <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <span className="text-xs font-extrabold text-primary">{candidate.score || 85}</span>
                         </div>
                         <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                       </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {candidate.skills.slice(0, 3).map((s: string) => (
                          <Badge key={s} variant="secondary" className="text-[10px] font-bold px-2 py-0.5 rounded-md border-border/50">
                            {s}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="text-[10px] font-bold text-muted-foreground px-1">
                            +{candidate.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-6">
                      <Link href={`/candidates/${candidate.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-lg border-border/50" })}>
                        Full Profile
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
