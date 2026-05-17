export default function CandidatesLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-40 bg-muted rounded-xl" />
          <div className="h-4 w-52 bg-muted rounded-lg" />
        </div>
        <div className="h-11 w-36 bg-muted rounded-xl" />
      </div>

      <div className="flex gap-4">
        <div className="h-11 flex-1 bg-muted rounded-xl" />
        <div className="h-11 w-24 bg-muted rounded-xl" />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
        <div className="bg-muted/50 p-4">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 border-t border-border/30">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-muted rounded-lg" />
                  <div className="h-3 w-36 bg-muted rounded-lg" />
                </div>
              </div>
              <div className="h-10 w-10 bg-muted rounded-xl" />
              <div className="flex gap-1">
                <div className="h-5 w-14 bg-muted rounded-md" />
                <div className="h-5 w-14 bg-muted rounded-md" />
                <div className="h-5 w-14 bg-muted rounded-md" />
              </div>
              <div className="h-8 w-24 bg-muted rounded-lg ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
