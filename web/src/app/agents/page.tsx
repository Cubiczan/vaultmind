"use client";

import { useState } from "react";
import { agents } from "@/lib/demo-data";
import type { Agent } from "@/lib/demo-data";
import AgentCard from "@/components/AgentCard";

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-text-primary">Agent Marketplace</h1>
        <p className="text-sm text-text-secondary mt-1">
          Browse and deploy AI trading agents to manage your vaults
        </p>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {agents.map((agent, i) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            delay={100 + i * 100}
            onViewStrategy={setSelectedAgent}
          />
        ))}
      </div>

      {/* Strategy Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay" onClick={() => setSelectedAgent(null)}>
          <div
            className="bg-navy-light rounded-2xl border border-navy-border p-6 w-full max-w-lg mx-4 animate-fade-in-up max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-text-primary">{selectedAgent.name}</h2>
                <p className="text-xs text-text-muted mt-0.5">Strategy Details — Walrus-Verified</p>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              {/* Walrus CID */}
              <div className="bg-navy rounded-lg p-4">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1.5 font-medium">Walrus Storage CID</p>
                <p className="text-xs text-accent font-mono break-all">{selectedAgent.walrusCid}</p>
                <p className="text-[10px] text-text-muted mt-1.5">
                  Strategy definition, backtest data, and configuration stored on Walrus decentralized storage
                </p>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{selectedAgent.description}</p>
              </div>

              {/* Parameters */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Agent Parameters</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-navy rounded-lg p-3">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Strategy Type</p>
                    <p className="text-sm font-medium text-text-primary">{selectedAgent.strategyType}</p>
                  </div>
                  <div className="bg-navy rounded-lg p-3">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Current Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`status-dot ${selectedAgent.status}`} />
                      <p className="text-sm font-medium text-text-primary capitalize">{selectedAgent.status}</p>
                    </div>
                  </div>
                  <div className="bg-navy rounded-lg p-3">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Risk Level</p>
                    <p className="text-sm font-medium" style={{ color: selectedAgent.riskLevel <= 3 ? "#22C55E" : selectedAgent.riskLevel <= 6 ? "#F59E0B" : "#EF4444" }}>
                      {selectedAgent.riskLevel}/10
                    </p>
                  </div>
                  <div className="bg-navy rounded-lg p-3">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Total Profit</p>
                    <p className="text-sm font-medium text-profit">{selectedAgent.totalProfit}</p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-navy rounded-lg p-3">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Reputation</p>
                    <p className="text-sm font-medium text-accent">{selectedAgent.reputation}%</p>
                  </div>
                  <div className="bg-navy rounded-lg p-3">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Success Rate</p>
                    <p className="text-sm font-medium text-profit">{selectedAgent.successRate}%</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Deploy to Vault
                </button>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="px-6 py-3 rounded-lg border border-navy-border text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}