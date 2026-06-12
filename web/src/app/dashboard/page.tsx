"use client";

import StatCard from "@/components/StatCard";
import MiniChart from "@/components/MiniChart";
import {
  dashboardStats,
  portfolioAllocation,
  rebalanceEvents,
  activityFeed,
} from "@/lib/demo-data";

// Generate a simulated 30-day AUM line
const aumData = Array.from({ length: 30 }, (_, i) => {
  const base = 3200;
  const trend = i * 8;
  const noise = Math.sin(i * 0.7) * 40 + Math.cos(i * 0.4) * 25;
  return base + trend + noise;
});

const feedTypeColors: Record<string, string> = {
  trade: "#22C55E",
  rebalance: "#3B82F6",
  deposit: "#06B6D4",
  withdraw: "#F59E0B",
  info: "#64748B",
};

function PieChart({ data }: { data: typeof portfolioAllocation }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  const segments = data.map((item) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += item.value;
    const endAngle = (cumulative / total) * 360;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const cx = 100;
    const cy = 100;
    const r = 80;
    const innerR = 50;

    const x1Outer = cx + r * Math.cos(startRad);
    const y1Outer = cy + r * Math.sin(startRad);
    const x2Outer = cx + r * Math.cos(endRad);
    const y2Outer = cy + r * Math.sin(endRad);
    const x1Inner = cx + innerR * Math.cos(endRad);
    const y1Inner = cy + innerR * Math.sin(endRad);
    const x2Inner = cx + innerR * Math.cos(startRad);
    const y2Inner = cy + innerR * Math.sin(startRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const path = [
      `M ${x1Outer} ${y1Outer}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
      `L ${x1Inner} ${y1Inner}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
      "Z",
    ].join(" ");

    return { ...item, path };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg viewBox="0 0 200 200" className="w-48 h-48 shrink-0">
        {segments.map((seg) => (
          <path key={seg.name} d={seg.path} fill={seg.color} className="pie-segment" />
        ))}
        <circle cx="100" cy="100" r="48" fill="#0B1120" />
        <text x="100" y="96" textAnchor="middle" fill="#F1F5F9" fontSize="14" fontWeight="bold">
          $3.4M
        </text>
        <text x="100" y="112" textAnchor="middle" fill="#64748B" fontSize="8">
          Total AUM
        </text>
      </svg>
      <div className="space-y-2 flex-1 w-full">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3 text-sm">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-text-secondary flex-1 truncate">{item.name}</span>
            <span className="text-text-primary font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Live overview of your VaultMind portfolio
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total AUM"
          value={dashboardStats.totalAUM}
          subtext="+$84K this week"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
          trend="up"
          delay={100}
        />
        <StatCard
          label="24h PnL"
          value={dashboardStats.pnl24h}
          subtext="Across all vaults"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          }
          trend="up"
          delay={200}
        />
        <StatCard
          label="Active Agents"
          value={String(dashboardStats.activeAgents)}
          subtext="1 idle, 1 analyzing, 1 executing"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
              <path d="M16 14H8a6 6 0 0 0-6 6v1h20v-1a6 6 0 0 0-6-6z" />
            </svg>
          }
          trend="neutral"
          delay={300}
        />
        <StatCard
          label="Rebalances Today"
          value={String(dashboardStats.rebalancesToday)}
          subtext="Last: 5 min ago"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          }
          trend="neutral"
          delay={400}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AUM Chart — spans 2 cols */}
        <div className="lg:col-span-2 bg-navy-light rounded-xl border border-navy-border p-5 animate-fade-in-up" style={{ animationDelay: "300ms", opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">AUM Over Time (30d)</h3>
            <span className="text-xs text-profit font-medium">+18.2%</span>
          </div>
          <MiniChart data={aumData} height={200} color="#3B82F6" />
          <div className="flex justify-between text-[10px] text-text-muted mt-2">
            <span>30 days ago</span>
            <span>15 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Portfolio Allocation Pie */}
        <div className="bg-navy-light rounded-xl border border-navy-border p-5 animate-fade-in-up" style={{ animationDelay: "400ms", opacity: 0 }}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Portfolio Allocation</h3>
          <PieChart data={portfolioAllocation} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <div className="bg-navy-light rounded-xl border border-navy-border p-5 animate-fade-in-up" style={{ animationDelay: "500ms", opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Agent Activity Timeline</h3>
            <span className="flex items-center gap-1.5 text-xs text-profit">
              <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" />
              Live
            </span>
          </div>
          <div className="space-y-0 max-h-80 overflow-y-auto pr-1">
            {activityFeed.map((item, i) => (
              <div key={item.id} className="flex gap-3 feed-item" style={{ animationDelay: `${i * 60}ms` }}>
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <span
                    className="shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 z-10"
                    style={{ backgroundColor: feedTypeColors[item.type] || "#64748B" }}
                  />
                  {i < activityFeed.length - 1 && (
                    <div className="w-px flex-1 bg-navy-border min-h-[24px]" />
                  )}
                </div>
                <div className="pb-4 flex-1 min-w-0">
                  <p className="text-xs text-text-secondary leading-relaxed">{item.message}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rebalance Events */}
        <div className="bg-navy-light rounded-xl border border-navy-border p-5 animate-fade-in-up" style={{ animationDelay: "600ms", opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Recent Rebalances</h3>
            <span className="text-xs text-text-muted">{rebalanceEvents.length} today</span>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {rebalanceEvents.map((event, i) => (
              <div
                key={event.id}
                className="bg-navy rounded-lg p-3.5 feed-item"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <span className="text-xs font-semibold text-text-primary">{event.vault}</span>
                  <span className="text-[10px] text-text-muted shrink-0">{event.timestamp}</span>
                </div>
                <p className="text-xs text-text-secondary mb-1.5">{event.action}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] text-text-muted">by {event.agent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}