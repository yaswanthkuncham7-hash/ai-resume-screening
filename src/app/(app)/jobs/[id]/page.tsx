/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
import ResumeUpload from "@/components/resume-upload";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { HireQuickAction } from "./hire-quick-action";

export default async function JobDetailsPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const jobId = params.id;
  
  let jobDesc = null;
  let matches: any[] = [];
  
  try {
    jobDesc = await db.jobDescription.findUnique({
      where: { id: jobId },
    });
    
    matches = await (db as any).matchResult.findMany({
      where: { 
        jobId,
        NOT: {
          OR: [
            { status: "Hired" },
            { status: "Rejected" }
          ]
        }
      },
      include: { candidate: true },
      orderBy: { score: "desc" },
    });
  } catch (err) {
    console.warn("DB error, using mock data");
    // Mock data for UI demo
    jobDesc = {
      title: "Senior Frontend Engineer",
      requiredSkills: ["React", "TypeScript", "Next.js"],
      preferredSkills: ["GraphQL", "Tailwind CSS"],
      experienceRequired: "5+ years",
    };
    
    matches = [
      {
        id: "m1",
        score: 95,
        rationale: "Excellent fit. Strong React and TS experience.",
        candidate: { id: "c1", name: "Alice Smith", email: "alice@example.com" }
      },
      {
        id: "m2",
        score: 75,
        rationale: "Good React skills, but lacks Next.js experience.",
        candidate: { id: "c2", name: "Bob Jones", email: "bob@example.com" }
      }
    ];
  }

  if (!jobDesc) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{jobDesc.title}</h1>
          <div className="mt-2 flex gap-2 flex-wrap">
            {jobDesc.requiredSkills?.map((s: string) => (
              <Badge key={s} variant="default">{s}</Badge>
            ))}
            {jobDesc.preferredSkills?.map((s: string) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              {matches.length === 0 ? (
                <p className="text-muted-foreground text-sm">No candidates uploaded yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Rationale</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div className="font-medium">{match.candidate?.name || 'Unknown Candidate'}</div>
                          <div className="text-xs text-muted-foreground">{match.candidate?.email || 'No email provided'}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${match.score >= 80 ? 'text-green-600 dark:text-green-400' : match.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                              {match.score}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm max-w-xs truncate">
                          {match.rationale}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {(match.candidate?.id || match.candidateId) && (
                              <>
                                <Link href={`/candidates/${match.candidate?.id || match.candidateId}?jobId=${jobId}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                  View Profile
                                </Link>
                                <HireQuickAction candidateId={match.candidate?.id || match.candidateId} jobId={jobId} candidateName={match.candidate?.name || 'Candidate'} />
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <ResumeUpload jobId={jobId} />
        </div>
      </div>
    </div>
  );
}
