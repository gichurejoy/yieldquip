
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-4 border", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium mt-2",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}% from last week
            </p>
          )}
        </div>
        <div className="p-2 rounded-md bg-primary bg-opacity-10">
          {icon}
        </div>
      </div>
    </div>
  );
}
