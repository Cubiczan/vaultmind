"use client";

import { useState } from "react";
import type { Vault } from "@/lib/demo-data";
import { getRiskColor, getStatusColor, getResultColor } from "@/lib/demo-data";
import MiniChart from "./MiniChart";
import RiskBadge from "./RiskBadge";

interface VaultCardProps {
  vault: Vault;
  delay?: number;
}

export default function VaultCard({ vault, delay = 0 }: VaultCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-navy-light rounded-xl border border-navy-border card-hover animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      {/* Main Content */}
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-text-primary truncate">{vault.name}</h3>
              <span
                className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${getStatusColor(vault.status)}20`,
                  color: getStatusColor(vault.status),
                }}
              >
                {vault.status}
              </span>
            </div>
            <p className="text-xs text-text-muted">{vault.strategyType} · Managed by {vault.agentName}</p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right">
              <p className="text-xs text-text-muted">TVL</p>
              <p className="text-sm font-semibold text-text-primary">{vault.tvl}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted">APY</p>
              <p className="text-sm font-semibold text-profit">{vault.apy}</p>
            </div>
            <RiskBadge level={vault.riskLevel} />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-text-muted transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Sparkline */}
        <MiniChart data={vault.performanceData} height={40} color={vault.status === "paused" ? "#F59E0B" : "#3B82F6"} />
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-navy-border pt-4 animate-fade-in">
          <p className="text-sm text-text-secondary mb-4">{vault.description}</p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-navy rounded-lg p-3">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Total Deposits</p>
              <p className="text-sm font-semibold">{vault.totalDeposits}</p>
            </div>
            <div className="bg-navy rounded-lg p-3">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Risk Level</p>
              <p className="text-sm font-semibold" style={{ color: getRiskColor(vault.riskLevel) }}>
                {vault.riskLevel}/10
              </p>
            </div>
            <div className="bg-navy rounded-lg p-3">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Agent</p>
              <p className="text-sm font-semibold text-primary">{vault.agentName}</p>
            </div>
            <div className="bg-navy rounded-lg p-3">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Strategy</p>
              <p className="text-sm font-semibold text-text-primary">{vault.strategyType}</p>
            </div>
          </div>

          {/* Recent Executions */}
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Recent Executions</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {vault.recentExecutions.map((exec) => (
              <div
                key={exec.id}
                className="flex items-center justify-between bg-navy rounded-lg px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: getResultColor(exec.result) }}
                  />
                  <span className="text-text-secondary truncate">{exec.action}</span>
                  <span className="text-text-muted shrink-0">{exec.amount}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {exec.profit && <span className="text-profit font-medium">{exec.profit}</span>}
                  <span className="text-text-muted">{exec.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}