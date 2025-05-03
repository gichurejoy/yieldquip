
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  type: 'expense' | 'income' | 'task' | 'alert';
}

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

export function ActivityCard({ activity, className }: ActivityCardProps) {
  const colorMap = {
    expense: "bg-red-100 text-red-800",
    income: "bg-green-100 text-green-800",
    task: "bg-blue-100 text-blue-800",
    alert: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-4 border", className)}>
      <div className="flex items-start">
        <div className={cn("p-2 rounded-md mr-4", colorMap[activity.type])}>
          {activity.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{activity.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">{activity.date}</span>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
