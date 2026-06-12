import { getRiskColor, getRiskLabel } from "@/lib/demo-data";

interface RiskBadgeProps {
  level: number;
  size?: "sm" | "md";
}

export default function RiskBadge({ level, size = "sm" }: RiskBadgeProps) {
  const color = getRiskColor(level);
  const label = getRiskLabel(level);

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full overflow-hidden ${size === "sm" ? "w-16 h-1.5" : "w-24 h-2"}`}>
        <div
          className="h-full rounded-full risk-bar-fill"
          style={{ width: `${level * 10}%`, backgroundColor: color }}
        />
      </div>
      <span
        className={`font-semibold ${size === "sm" ? "text-[11px]" : "text-xs"}`}
        style={{ color }}
      >
        {level}/10 {size === "md" && label}
      </span>
    </div>
  );
}