export default function SettingsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-52 bg-muted rounded-xl" />
        <div className="h-4 w-72 bg-muted rounded-lg" />
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-2xl border border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-muted rounded-lg" />
            <div className="space-y-1">
              <div className="h-5 w-36 bg-muted rounded-lg" />
              <div className="h-3 w-56 bg-muted rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-11 bg-muted rounded-xl" />
            <div className="h-11 bg-muted rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
