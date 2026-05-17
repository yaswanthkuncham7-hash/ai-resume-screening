/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background/50 backdrop-blur-md px-6 sticky top-0 z-10">
          <div className="flex flex-1 items-center gap-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">HireLens AI Platform</h2>
          </div>
          <ModeToggle />
          <Avatar className="h-8 w-8 border border-border/50">
            <AvatarImage src="" alt="@recruiter" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">RC</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/20 via-background to-background dark:from-indigo-950/10 dark:via-background dark:to-background">
          {children}
        </main>
      </div>
    </div>
  );
}
