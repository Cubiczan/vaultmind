interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}

export default function StatCard({ label, value, subtext, icon, trend, delay = 0 }: StatCardProps) {
  const trendColor = trend === "up" ? "text-profit" : trend === "down" ? "text-loss" : "text-text-secondary";

  return (
    <div
      className="bg-navy-light rounded-xl p-5 border border-navy-border card-hover animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-text-secondary text-sm font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-navy-lighter flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-text-primary mb-1">{value}</p>
      {subtext && (
        <p className={`text-xs ${trendColor}`}>
          {trend === "up" && "↑ "}
          {trend === "down" && "↓ "}
          {subtext}
        </p>
      )}
    </div>
  );
}