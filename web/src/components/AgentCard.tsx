import type { Agent } from "@/lib/demo-data";
import RiskBadge from "./RiskBadge";

interface AgentCardProps {
  agent: Agent;
  delay?: number;
  onViewStrategy?: (agent: Agent) => void;
}

export default function AgentCard({ agent, delay = 0, onViewStrategy }: AgentCardProps) {
  const statusLabel = agent.status.charAt(0).toUpperCase() + agent.status.slice(1);

  return (
    <div
      className="bg-navy-light rounded-xl border border-navy-border card-hover p-5 flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
              <path d="M16 14H8a6 6 0 0 0-6 6v1h20v-1a6 6 0 0 0-6-6z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary">{agent.name}</h3>
            <p className="text-xs text-text-muted">{agent.strategyType}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`status-dot ${agent.status}`} />
          <span className="text-[11px] text-text-muted">{statusLabel}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">{agent.description}</p>

      {/* Risk Badge */}
      <div className="mb-4">
        <RiskBadge level={agent.riskLevel} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-navy rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Reputation</p>
          <p className="text-sm font-bold text-accent">{agent.reputation}%</p>
        </div>
        <div className="bg-navy rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Success</p>
          <p className="text-sm font-bold text-profit">{agent.successRate}%</p>
        </div>
        <div className="bg-navy rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Profit</p>
          <p className="text-sm font-bold text-text-primary">{agent.totalProfit}</p>
        </div>
      </div>

      {/* Reputation Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-text-muted mb-1">
          <span>Reputation Score</span>
          <span>{agent.reputation}/100</span>
        </div>
        <div className="h-1.5 bg-navy rounded-full overflow-hidden">
          <div
            className="h-full rounded-full risk-bar-fill"
            style={{
              width: `${agent.reputation}%`,
              backgroundColor: agent.reputation >= 90 ? "#22C55E" : agent.reputation >= 70 ? "#06B6D4" : "#F59E0B",
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={() => onViewStrategy?.(agent)}
        className="w-full py-2.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
      >
        View Strategy
      </button>
    </div>
  );
}