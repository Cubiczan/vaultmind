"use client";

import { useState } from "react";
import { vaults } from "@/lib/demo-data";
import VaultCard from "@/components/VaultCard";

const strategyTypes = ["All", ...Array.from(new Set(vaults.map((v) => v.strategyType)))];
const riskLevels = ["All", "Low (1-3)", "Medium (4-6)", "High (7-10)"];

export default function VaultsPage() {
  const [strategyFilter, setStrategyFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = vaults.filter((v) => {
    if (strategyFilter !== "All" && v.strategyType !== strategyFilter) return false;
    if (riskFilter === "Low (1-3)" && v.riskLevel > 3) return false;
    if (riskFilter === "Medium (4-6)" && (v.riskLevel < 4 || v.riskLevel > 6)) return false;
    if (riskFilter === "High (7-10)" && v.riskLevel < 7) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary animate-fade-in">Vaults</h1>
          <p className="text-sm text-text-secondary mt-1 animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
            Browse and manage AI-powered DeFi vaults
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="shrink-0 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity glow-button"
        >
          + Create Vault
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: "150ms", opacity: 0 }}>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-text-muted self-center mr-1">Strategy:</span>
          {strategyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setStrategyFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                strategyFilter === type
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-navy-lighter text-text-secondary border border-navy-border hover:text-text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <span className="text-xs text-text-muted self-center mr-1">Risk:</span>
          {riskLevels.map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                riskFilter === level
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-navy-lighter text-text-secondary border border-navy-border hover:text-text-primary"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Vault Cards */}
      <div className="space-y-3">
        {filtered.map((vault, i) => (
          <VaultCard key={vault.id} vault={vault} delay={200 + i * 80} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <p className="text-lg font-medium mb-1">No vaults found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Create Vault Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div
            className="bg-navy-light rounded-2xl border border-navy-border p-6 w-full max-w-md mx-4 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary">Create New Vault</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-medium">Vault Name</label>
                <input
                  type="text"
                  placeholder="e.g., My Strategy Vault"
                  className="w-full bg-navy border border-navy-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-medium">Strategy Type</label>
                <select className="w-full bg-navy border border-navy-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                  <option>DeFi Yield</option>
                  <option>Yield Farming</option>
                  <option>Arbitrage</option>
                  <option>Liquid Staking</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-medium">Select Agent</label>
                <select className="w-full bg-navy border border-navy-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                  <option>Momentum Alpha</option>
                  <option>Yield Harvester</option>
                  <option>Arb Sprinter</option>
                  <option>Stable Guardian</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-medium">Initial Deposit (SUI)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-navy border border-navy-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity mt-2"
              >
                Deploy Vault on Sui
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}