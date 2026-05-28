import { cn } from "@/lib/utils";
import { Badge } from "../../components/ui/badge";

type Status =
  | "pending"
  | "paid"
  | "processing"
  | "delivered"
  | "cancelled"
  | "active"
  | "inactive"
  | "low"
  | "medium"
  | "high"
  | "in-stock"
  | "out-of-stock"
  | "success"
  | "failed";

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusStyles: Record<Status, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  paid: "bg-green-100 text-green-800 hover:bg-green-100",
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  delivered: "bg-green-100 text-green-800 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  active: "bg-green-100 text-green-800 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  low: "bg-red-100 text-red-800 hover:bg-red-100",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  high: "bg-green-100 text-green-800 hover:bg-green-100",
  "in-stock": "bg-green-100 text-green-800 hover:bg-green-100",
  "out-of-stock": "bg-red-100 text-red-800 hover:bg-red-100",
  success: "bg-green-100 text-green-800 hover:bg-green-100",
  failed: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayLabel =
    label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge className={cn("font-medium", statusStyles[status])}>
      {displayLabel}
    </Badge>
  );
}
