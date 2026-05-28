import { Card } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card className="p-6 border-[var(--honey-gold)]/20">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="w-12 h-12 rounded-lg" />
      </div>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card className="p-6 border-[var(--honey-gold)]/20">
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="p-6 border-[var(--honey-gold)]/20">
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    </Card>
  );
}
