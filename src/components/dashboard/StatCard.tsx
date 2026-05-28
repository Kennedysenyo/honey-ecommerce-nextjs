import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../../components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
}: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow border-[var(--honey-gold)]/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-[var(--dark-cocoa)] mb-2">
            {value}
          </h3>

          {trend && (
            <div className="flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}

          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        <div className="w-12 h-12 bg-[var(--honey-gold)]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-[var(--honey-gold)]" />
        </div>
      </div>
    </Card>
  );
}
