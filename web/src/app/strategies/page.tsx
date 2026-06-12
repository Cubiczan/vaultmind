"use client";

import { useState } from "react";
import { strategies, getRiskColor } from "@/lib/demo-data";
import type { Strategy } from "@/lib/demo-data";
import MiniChart from "@/components/MiniChart";
import RiskBadge from "@/components/RiskBadge";

export default function StrategiesPage() {
  const [backtestStrategy, setBacktestStrategy] = useState<Strategy | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-text-primary">Strategy Explorer</h1>
        <p className="text-sm text-text-secondary mt-1">
          Browse, backtest, and deploy trading strategies from the community marketplace
        </p>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {strategies.map((strategy, i) => (
          <div
            key={strategy.id}
            className="bg-navy-light rounded-xl border border-navy-border card-hover p-5 animate-fade-in-up flex flex-col"
            style={{ animationDelay: `${100 + i * 100}ms`, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-text-primary">{strategy.name}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                  {strategy.category}
                </span>
              </div>
              <RiskBadge level={strategy.riskLevel} size="md" />
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-4 flex-1 line-clamp-2">{strategy.description}</p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-navy rounded-lg p-2.5 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Sharpe</p>
                <p className="text-sm font-bold text-primary">{strategy.sharpe}</p>
              </div>
              <div className="bg-navy rounded-lg p-2.5 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Max DD</p>
                <p className="text-sm font-bold text-loss">-{strategy.maxDrawdown}%</p>
              </div>
              <div className="bg-navy rounded-lg p-2.5 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Win Rate</p>
                <p className="text-sm font-bold text-profit">{strategy.winRate}%</p>
              </div>
            </div>

            {/* Mini Chart Preview */}
            <div className="mb-4 bg-navy rounded-lg p-3">
              <div className="flex justify-between text-[10px] text-text-muted mb-1">
                <span>90-Day Preview</span>
                <span style={{ color: strategy.backtestData[strategy.backtestData.length - 1] > strategy.backtestData[0] ? "#22C55E" : "#EF4444" }}>
                  {((strategy.backtestData[strategy.backtestData.length - 1] / strategy.backtestData[0] - 1) * 100).toFixed(1)}%
                </span>
              </div>
              <MiniChart data={strategy.backtestData} height={50} color={strategy.riskLevel <= 3 ? "#22C55E" : strategy.riskLevel <= 6 ? "#3B82F6" : "#F59E0B"} />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setBacktestStrategy(strategy)}
                className="flex-1 py-2.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                View Backtest
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                Deploy to Vault
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Backtest Modal */}
      {backtestStrategy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay" onClick={() => setBacktestStrategy(null)}>
          <div
            className="bg-navy-light rounded-2xl border border-navy-border p-6 w-full max-w-2xl mx-4 animate-fade-in-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-text-primary">{backtestStrategy.name}</h2>
                <p className="text-xs text-text-muted mt-0.5">90-Day Backtest Results</p>
              </div>
              <button
                onClick={() => setBacktestStrategy(null)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Performance Chart */}
            <div className="bg-navy rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-primary">Performance (Indexed to 100)</span>
                <span
                  className="text-sm font-bold"
                  style={{
                    color: backtestStrategy.backtestData[backtestStrategy.backtestData.length - 1] > 100 ? "#22C55E" : "#EF4444",
                  }}
                >
                  {backtestStrategy.backtestData[backtestStrategy.backtestData.length - 1].toFixed(1)} ({((backtestStrategy.backtestData[backtestStrategy.backtestData.length - 1] / 100 - 1) * 100).toFixed(1)}%)
                </span>
              </div>
              <MiniChart
                data={backtestStrategy.backtestData}
                height={220}
                color={backtestStrategy.backtestData[backtestStrategy.backtestData.length - 1] > 100 ? "#22C55E" : "#EF4444"}
                showDots={false}
              />
              <div className="flex justify-between text-[10px] text-text-muted mt-2">
                <span>Day 1</span>
                <span>Day 30</span>
                <span>Day 60</span>
                <span>Day 90</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-navy rounded-lg p-4 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Sharpe Ratio</p>
                <p className="text-xl font-bold text-primary">{backtestStrategy.sharpe}</p>
              </div>
              <div className="bg-navy rounded-lg p-4 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Max Drawdown</p>
                <p className="text-xl font-bold text-loss">-{backtestStrategy.maxDrawdown}%</p>
              </div>
              <div className="bg-navy rounded-lg p-4 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Win Rate</p>
                <p className="text-xl font-bold text-profit">{backtestStrategy.winRate}%</p>
              </div>
              <div className="bg-navy rounded-lg p-4 text-center">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Risk Level</p>
                <p className="text-xl font-bold" style={{ color: getRiskColor(backtestStrategy.riskLevel) }}>
                  {backtestStrategy.riskLevel}/10
                </p>
              </div>
            </div>

            {/* Strategy Description */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Strategy Description</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{backtestStrategy.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setBacktestStrategy(null)}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Deploy to Vault
              </button>
              <button
                onClick={() => setBacktestStrategy(null)}
                className="px-6 py-3 rounded-lg border border-navy-border text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}