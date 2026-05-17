/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserMinus, UserCheck, Briefcase, Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deactivateEmployee } from "@/app/actions";
import { DeactivateButton } from "./deactivate-button";

export default async function EmployeesPage() {
  let employees: any[] = [];
  
  try {
    employees = await (db as any).employee.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("DB error, using mock data");
    employees = [
      { id: "e1", name: "Sarah Chen", role: "Senior Frontend Engineer", status: "Active" },
      { id: "e2", name: "Michael Ross", role: "Product Manager", status: "Active" },
      { id: "e3", name: "Jessica Day", role: "UX Designer", status: "Active" },
    ];
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight">Internal Team</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Users className="h-4 w-4" /> Manage active employees and talent lifecycle
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search employees by name or role..." className="pl-10 h-11 bg-card/50 rounded-xl" />
        </div>
        <button className="h-11 px-4 border border-border/50 rounded-xl bg-card/50 hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border/50">
                <TableHead className="font-bold py-4">Employee</TableHead>
                <TableHead className="font-bold py-4">Current Role</TableHead>
                <TableHead className="font-bold py-4">Status</TableHead>
                <TableHead className="font-bold py-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} className="border-border/40 hover:bg-muted/30 transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {emp.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">emp_{emp.id.split('-').pop()}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{emp.role}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant={emp.status === 'Active' ? 'outline' : 'secondary'} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                    }`}>
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6">
                    {emp.status === 'Active' ? (
                      <DeactivateButton employeeId={emp.id} employeeName={emp.name} employeeRole={emp.role} />
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Position being rehired...</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
