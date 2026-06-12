/**
 * VaultMind — Agent Execution Engine
 * Simulates AI agent trading logic for demo purposes.
 * In production, this would connect to real DEXes via Sui SDK.
 */

import type { AgentMemory, PositionSnapshot, ExecutionEntry } from "./walrus";

export interface AgentSignal {
  action: "buy" | "sell" | "hold" | "rebalance";
  token: string;
  amount: number;
  confidence: number; // 0-1
  reasoning: string;
}

export interface AgentConfig {
  agentId: string;
  name: string;
  strategyType: string;
  riskTolerance: number; // 1-10
  maxPositions: number;
  rebalanceIntervalMs: number;
}

export class AgentEngine {
  private config: AgentConfig;
  private memory: AgentMemory;
  private signalCount = 0;

  constructor(config: AgentConfig, initialMemory?: AgentMemory) {
    this.config = config;
    this.memory = initialMemory || {
      agentId: config.agentId,
      state: "idle",
      lastSignal: null,
      positionSnapshot: null,
      executionLog: [],
      updatedAt: new Date().toISOString(),
    };
  }

  getMemory(): AgentMemory {
    return { ...this.memory };
  }

  getConfig(): AgentConfig {
    return { ...this.config };
  }

  /**
   * Generate a trading signal based on simulated market analysis.
   * In production, this would call an actual LLM or on-chain oracle.
   */
  generateSignal(marketData: { suiPrice: number; suiChange24h: number; tvl: number }): AgentSignal {
    this.memory.state = "analyzing";
    this.signalCount++;

    // Simulated signal generation based on strategy type
    let signal: AgentSignal;

    switch (this.config.strategyType) {
      case "momentum":
        signal = this.momentumSignal(marketData);
        break;
      case "yield":
        signal = this.yieldSignal(marketData);
        break;
      case "arbitrage":
        signal = this.arbitrageSignal(marketData);
        break;
      default:
        signal = { action: "hold", token: "SUI", amount: 0, confidence: 0.5, reasoning: "No clear signal" };
    }

    this.memory.lastSignal = `${signal.action} ${signal.token} (${(signal.confidence * 100).toFixed(0)}%)`;
    this.memory.state = signal.action === "hold" ? "idle" : "executing";
    this.memory.updatedAt = new Date().toISOString();

    return signal;
  }

  /**
   * Execute a signal and record the result.
   */
  executeSignal(signal: AgentSignal, vaultId: string): ExecutionEntry {
    this.memory.state = "executing";

    // Simulate execution (always succeeds in demo)
    const profitDelta = signal.action === "sell"
      ? Math.random() * 0.05 * 1e9 // 0-5% profit
      : signal.action === "buy" ? 0
      : 0;

    const entry: ExecutionEntry = {
      timestamp: new Date().toISOString(),
      action: `${signal.action} ${signal.token}`,
      vaultId,
      result: Math.random() > 0.1 ? "success" : "failure", // 90% success rate
      details: signal.reasoning,
      profitDelta: Math.round(profitDelta),
    };

    this.memory.executionLog.unshift(entry);
    // Keep last 100 entries
    if (this.memory.executionLog.length > 100) {
      this.memory.executionLog = this.memory.executionLog.slice(0, 100);
    }

    // Update position snapshot
    this.memory.positionSnapshot = this.generatePositionSnapshot();
    this.memory.state = "waiting";
    this.memory.updatedAt = new Date().toISOString();

    return entry;
  }

  private momentumSignal(data: { suiPrice: number; suiChange24h: number }): AgentSignal {
    if (data.suiChange24h > 3) {
      return {
        action: "buy", token: "SUI",
        amount: 1000, confidence: 0.75,
        reasoning: `Strong momentum detected: ${data.suiChange24h.toFixed(1)}% 24h change. Entering long position.`,
      };
    } else if (data.suiChange24h < -2) {
      return {
        action: "sell", token: "SUI",
        amount: 500, confidence: 0.65,
        reasoning: `Bearish momentum: ${data.suiChange24h.toFixed(1)}% 24h. Reducing exposure.`,
      };
    }
    return { action: "hold", token: "SUI", amount: 0, confidence: 0.5, reasoning: "No significant momentum signal" };
  }

  private yieldSignal(data: { tvl: number }): AgentSignal {
    if (data.tvl > 100_000_000) {
      return {
        action: "rebalance", token: "USDC",
        amount: 2000, confidence: 0.8,
        reasoning: `High TVL detected (${(data.tvl / 1e6).toFixed(0)}M). Reallocating to stablecoin yields.`,
      };
    }
    return { action: "hold", token: "USDC", amount: 0, confidence: 0.6, reasoning: "Yield conditions stable" };
  }

  private arbitrageSignal(data: { suiPrice: number }): AgentSignal {
    // Simulate detecting a spread
    const spread = Math.random() * 100; // 0-100 bps
    if (spread > 50) {
      return {
        action: "buy", token: "SUI",
        amount: 5000, confidence: 0.9,
        reasoning: `Cross-protocol spread: ${spread.toFixed(0)} bps. Executing arb.`,
      };
    }
    return { action: "hold", token: "SUI", amount: 0, confidence: 0.4, reasoning: "No profitable spread detected" };
  }

  private generatePositionSnapshot(): PositionSnapshot {
    const suiAmount = Math.round(Math.random() * 10000 * 1e9) / 1e9;
    const usdcAmount = Math.round(Math.random() * 5000 * 1e6) / 1e6;
    const totalValue = suiAmount * 1.85 + usdcAmount;
    const pnl = (Math.random() * 0.08 - 0.02) * 10000;

    return {
      tokens: [
        { symbol: "SUI", amount: suiAmount, valueSui: suiAmount },
        { symbol: "USDC", amount: usdcAmount, valueSui: usdcAmount / 1.85 },
      ],
      totalValueSui: Math.round(totalValue * 100) / 100,
      unrealizedPnlBps: Math.round(pnl),
    };
  }
}

// ========== Demo Agent Configs ==========

export const DEMO_AGENTS: AgentConfig[] = [
  {
    agentId: "agent-momentum-01",
    name: "Momentum Alpha",
    strategyType: "momentum",
    riskTolerance: 6,
    maxPositions: 5,
    rebalanceIntervalMs: 3600000,
  },
  {
    agentId: "agent-yield-01",
    name: "Yield Harvester",
    strategyType: "yield",
    riskTolerance: 3,
    maxPositions: 4,
    rebalanceIntervalMs: 86400000,
  },
  {
    agentId: "agent-arb-01",
    name: "Arb Sprinter",
    strategyType: "arbitrage",
    riskTolerance: 2,
    maxPositions: 2,
    rebalanceIntervalMs: 5000,
  },
  {
    agentId: "agent-stable-01",
    name: "Stable Guardian",
    strategyType: "yield",
    riskTolerance: 1,
    maxPositions: 3,
    rebalanceIntervalMs: 86400000,
  },
];