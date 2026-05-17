export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded-xl" />
          <div className="h-4 w-48 bg-muted rounded-lg" />
        </div>
        <div className="h-11 w-36 bg-muted rounded-xl" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card border border-border/50 p-6 rounded-3xl space-y-6">
            <div className="flex justify-between">
              <div className="h-12 w-12 bg-muted rounded-2xl" />
              <div className="h-8 w-8 bg-muted rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded-lg" />
              <div className="h-10 w-16 bg-muted rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 glass-card rounded-3xl p-6 h-[380px]">
          <div className="h-6 w-32 bg-muted rounded-lg mb-4" />
          <div className="h-full w-full bg-muted/50 rounded-2xl" />
        </div>
        <div className="md:col-span-3 glass-card rounded-3xl p-6 h-[380px]">
          <div className="h-6 w-28 bg-muted rounded-lg mb-4" />
          <div className="h-full w-full bg-muted/50 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
