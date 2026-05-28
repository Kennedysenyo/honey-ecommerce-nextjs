import { LucideIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="p-12 text-center border-[var(--honey-gold)]/20">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-[var(--honey-gold)]/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-[var(--honey-gold)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--dark-cocoa)] mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-[var(--honey-gold)] hover:bg-[var(--deep-amber)] text-white"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
