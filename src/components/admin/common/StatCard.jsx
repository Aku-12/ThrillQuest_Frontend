import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "green",
}) {
  const isPositive = trend.direction === "up";
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  const trendColorClass = isPositive ? `text-${color}-600` : "text-red-600";
  const iconBgClass = `bg-${color}-100`;
  const iconColorClass = `text-${color}-600`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm">
      <div className="flex items-start justify-between">
        {/* Left side content */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="mt-1 text-4xl font-bold text-gray-800">
            {/* Format number with commas */}
            {value.toLocaleString()}
          </p>
          {trend && (
            <div className={`mt-2 flex items-center gap-1 ${trendColorClass}`}>
              <TrendIcon size={16} strokeWidth={3} />
              <span className="font-semibold">{trend.value}%</span>
            </div>
          )}
        </div>

        {/* Right side icon */}
        <div className={`p-4 rounded-full ${iconBgClass}`}>
          <Icon className={`h-6 w-6 ${iconColorClass}`} />
        </div>
      </div>
    </div>
  );
}
