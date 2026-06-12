"use client";

import Link from "next/link";
import StatCard from "@/components/StatCard";
import MiniChart from "@/components/MiniChart";
import { activityFeed } from "@/lib/demo-data";

const heroChart = Array.from({ length: 60 }, (_, i) => {
  const base = 100;
  const trend = i * 0.3;
  const noise = Math.sin(i * 0.5) * 3 + Math.cos(i * 0.3) * 2;
  return base + trend + noise;
});

const features = [
  {
    title: "AI Trading Agents",
    description: "Autonomous agents execute strategies 24/7, adapting to market conditions in real-time across Sui DeFi protocols.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M16 14H8a6 6 0 0 0-6 6v1h20v-1a6 6 0 0 0-6-6z" />
      </svg>
    ),
  },
  {
    title: "Walrus Storage",
    description: "Strategy definitions, backtests, and agent configs stored permanently on Walrus decentralized storage network.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: "On-Chain Vaults",
    description: "All vaults are fully on-chain Sui Move contracts with transparent accounting and permissionless deposits/withdrawals.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Strategy Marketplace",
    description: "Browse, backtest, and deploy community-built strategies. Or create your own and earn from vault fees.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

const feedTypeIcon: Record<string, string> = {
  trade: "#22C55E",
  rebalance: "#3B82F6",
  deposit: "#06B6D4",
  withdraw: "#F59E0B",
  info: "#64748B",
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3B82F6 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, #06B6D4 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="relative py-16 sm:py-20 px-6 sm:px-10 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: "0ms", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
              <span className="text-xs text-primary font-medium">Live on Sui Devnet</span>
            </div>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in-up"
            style={{ animationDelay: "100ms", opacity: 0 }}
          >
            <span className="gradient-text">VaultMind</span>
          </h1>
          <p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 animate-fade-in-up"
            style={{ animationDelay: "200ms", opacity: 0 }}
          >
            AI Agent-Managed DeFi Vaults on Sui
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "300ms", opacity: 0 }}
          >
            <Link
              href="/vaults"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Explore Vaults
            </Link>
            <Link
              href="/agents"
              className="px-8 py-3.5 rounded-xl border border-navy-border text-text-primary font-semibold text-sm hover:bg-navy-lighter transition-all"
            >
              View Agents
            </Link>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          label="Total Value Locked"
          value="$2.4M"
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
          label="Active Agents"
          value="12"
          subtext="4 strategies running"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" /><path d="M16 14H8a6 6 0 0 0-6 6v1h20v-1a6 6 0 0 0-6-6z" />
            </svg>
          }
          trend="neutral"
          delay={200}
        />
        <StatCard
          label="Vaults"
          value="8"
          subtext="5 active, 1 paused"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          trend="neutral"
          delay={300}
        />
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "100ms", opacity: 0 }}>
          Why VaultMind?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-navy-light rounded-xl border border-navy-border p-6 card-hover animate-fade-in-up"
              style={{ animationDelay: `${200 + i * 100}ms`, opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Activity + Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-navy-light rounded-xl border border-navy-border p-5 animate-fade-in-up" style={{ animationDelay: "300ms", opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Platform TVL Growth</h3>
            <span className="text-xs text-profit font-medium">+18.2% 30d</span>
          </div>
          <MiniChart data={heroChart} height={180} color="#3B82F6" />
          <div className="flex justify-between text-[10px] text-text-muted mt-2">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-navy-light rounded-xl border border-navy-border p-5 animate-fade-in-up" style={{ animationDelay: "400ms", opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Live Agent Activity</h3>
            <span className="flex items-center gap-1.5 text-xs text-profit">
              <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" />
              Live
            </span>
          </div>
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {activityFeed.slice(0, 8).map((item, i) => (
              <div
                key={item.id}
                className="flex items-start gap-3 feed-item"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span
                  className="shrink-0 w-2 h-2 rounded-full mt-1.5"
                  style={{ backgroundColor: feedTypeIcon[item.type] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-secondary leading-relaxed">{item.message}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-border pt-8 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="gradient-text font-bold text-sm">VaultMind</span>
            <span className="text-text-muted text-xs">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Docs</a>
            <a href="#" className="hover:text-primary transition-colors">Sui Overflow 2026</a>
          </div>
        </div>
      </footer>
    </div>
  );
}