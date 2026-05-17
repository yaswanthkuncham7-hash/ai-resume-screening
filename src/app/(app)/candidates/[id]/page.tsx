/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CandidateActions } from "./candidate-actions";

export default async function CandidatePage(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ jobId?: string }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const candidateId = params.id;
  const jobId = searchParams.jobId;

  let candidate = null;
  let matchResult = null;

  try {
    candidate = await db.candidateProfile.findUnique({
      where: { id: candidateId },
    });

    if (jobId) {
      matchResult = await (db as any).matchResult.findUnique({
        where: { jobId_candidateId: { jobId, candidateId } },
      });
    }
  } catch (err) {
    console.warn("DB error, using mock candidate data");
    candidate = {
      id: "c1",
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "123-456-7890",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      experience: [
        { role: "Senior Frontend Developer", company: "TechCorp", duration: "2020 - Present" },
        { role: "Frontend Developer", company: "WebSolutions", duration: "2018 - 2020" }
      ],
      education: [
        { degree: "B.S. Computer Science", institution: "University of Tech", year: "2018" }
      ],
      parsedText: "Mock raw resume text...",
    };

    if (jobId) {
      matchResult = {
        score: 95,
        rationale: "Excellent fit. Strong React and TS experience perfectly aligns with the job requirements.",
      };
    }
  }

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {jobId && (
            <Link href={`/jobs/${jobId}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <div>
            <h1 className="text-3xl font-bold">{candidate.name}</h1>
            <p className="text-muted-foreground">{candidate.email} | {candidate.phone}</p>
          </div>
        </div>
        
        {jobId && (
          <CandidateActions candidateId={candidateId} jobId={jobId} candidateName={candidate.name} />
        )}
      </div>

      {matchResult && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>AI Evaluation</span>
              <span className="text-2xl font-bold text-primary">{matchResult.score}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{matchResult.rationale}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {candidate.skills?.map((s: string) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(candidate.education as any[] || []).map((edu, idx) => (
              <div key={idx}>
                <div className="font-semibold">{edu.degree}</div>
                <div className="text-sm text-muted-foreground">{edu.institution} {edu.year ? `(${edu.year})` : ''}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {(candidate.experience as any[] || []).map((exp, idx) => (
              <div key={idx}>
                <div className="font-semibold">{exp.role}</div>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                {idx < (candidate.experience as any[] || []).length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
