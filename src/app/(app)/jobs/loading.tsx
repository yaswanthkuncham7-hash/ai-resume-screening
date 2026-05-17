export default function JobsLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-xl" />
          <div className="h-4 w-64 bg-muted rounded-lg" />
        </div>
        <div className="h-11 w-32 bg-muted rounded-xl" />
      </div>

      <div className="flex gap-4">
        <div className="h-11 flex-1 bg-muted rounded-xl" />
        <div className="h-11 w-24 bg-muted rounded-xl" />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
        <div className="bg-muted/50 p-4">
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border-t border-border/30">
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-muted rounded-lg" />
                <div className="h-4 w-32 bg-muted rounded-lg" />
              </div>
              <div className="h-5 w-16 bg-muted rounded-full" />
              <div className="h-4 w-20 bg-muted rounded-lg" />
              <div className="h-4 w-24 bg-muted rounded-lg" />
              <div className="h-8 w-24 bg-muted rounded-lg ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
