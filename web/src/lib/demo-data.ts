// ============================================================
// VaultMind — Demo / Mock Data
// ============================================================

export interface Vault {
  id: string;
  name: string;
  strategyType: string;
  riskLevel: number;
  tvl: string;
  apy: string;
  totalDeposits: string;
  status: "active" | "paused" | "deprecated";
  agentId: string;
  agentName: string;
  description: string;
  performanceData: number[];
  recentExecutions: Execution[];
}

export interface Agent {
  id: string;
  name: string;
  strategyType: string;
  riskLevel: number;
  reputation: number;
  successRate: number;
  totalProfit: string;
  status: "idle" | "analyzing" | "executing";
  description: string;
  walrusCid: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  category: string;
  riskLevel: number;
  sharpe: number;
  maxDrawdown: number;
  winRate: number;
  backtestData: number[];
  agentId: string;
}

export interface Execution {
  id: string;
  timestamp: string;
  agentName: string;
  action: string;
  vaultName: string;
  amount: string;
  result: "success" | "partial" | "failed";
  profit?: string;
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  message: string;
  type: "trade" | "rebalance" | "deposit" | "withdraw" | "info";
}

// ── Vaults ──────────────────────────────────────────────────
export const vaults: Vault[] = [
  {
    id: "v1",
    name: "Momentum Alpha Vault",
    strategyType: "DeFi Yield",
    riskLevel: 6,
    tvl: "$850K",
    apy: "23.4%",
    totalDeposits: "$1.1M",
    status: "active",
    agentId: "a1",
    agentName: "Momentum Alpha",
    description: "High-yield momentum-based DeFi strategy leveraging cross-protocol yield opportunities on Sui.",
    performanceData: [100, 102, 101, 105, 108, 106, 110, 113, 111, 115, 118, 120, 119, 123, 126],
    recentExecutions: [
      { id: "e1", timestamp: "2 min ago", agentName: "Momentum Alpha", action: "Swap SUI → USDC", vaultName: "Momentum Alpha Vault", amount: "$12.5K", result: "success", profit: "+$340" },
      { id: "e2", timestamp: "18 min ago", agentName: "Momentum Alpha", action: "Supply to Turbos", vaultName: "Momentum Alpha Vault", amount: "$8.2K", result: "success", profit: "+$120" },
      { id: "e3", timestamp: "1h ago", agentName: "Momentum Alpha", action: "Withdraw from Cetus", vaultName: "Momentum Alpha Vault", amount: "$5.0K", result: "partial", profit: "+$90" },
    ],
  },
  {
    id: "v2",
    name: "Yield Harvester Vault",
    strategyType: "Yield Farming",
    riskLevel: 3,
    tvl: "$620K",
    apy: "12.1%",
    totalDeposits: "$780K",
    status: "active",
    agentId: "a2",
    agentName: "Yield Harvester",
    description: "Stable yield farming across top Sui DEXs with automatic compounding and risk management.",
    performanceData: [100, 100.5, 101, 101.8, 102.5, 103, 103.8, 104.2, 105, 105.6, 106, 106.8, 107.2, 108, 108.5],
    recentExecutions: [
      { id: "e4", timestamp: "5 min ago", agentName: "Yield Harvester", action: "Harvest rewards", vaultName: "Yield Harvester Vault", amount: "$2.1K", result: "success", profit: "+$85" },
      { id: "e5", timestamp: "30 min ago", agentName: "Yield Harvester", action: "Compound into LP", vaultName: "Yield Harvester Vault", amount: "$3.4K", result: "success", profit: "+$62" },
    ],
  },
  {
    id: "v3",
    name: "Arb Sprinter Vault",
    strategyType: "Arbitrage",
    riskLevel: 2,
    tvl: "$340K",
    apy: "8.7%",
    totalDeposits: "$340K",
    status: "active",
    agentId: "a3",
    agentName: "Arb Sprinter",
    description: "Low-risk cross-DEX arbitrage capturing price differences across Sui DEXs in real-time.",
    performanceData: [100, 100.2, 100.5, 100.3, 100.8, 101, 100.7, 101.2, 101.5, 101.3, 101.8, 102, 101.9, 102.3, 102.5],
    recentExecutions: [
      { id: "e6", timestamp: "1 min ago", agentName: "Arb Sprinter", action: "Arb: Cetus → Turbos", vaultName: "Arb Sprinter Vault", amount: "$45K", result: "success", profit: "+$180" },
      { id: "e7", timestamp: "12 min ago", agentName: "Arb Sprinter", action: "Arb: Aftermath → DeepBook", vaultName: "Arb Sprinter Vault", amount: "$28K", result: "success", profit: "+$95" },
    ],
  },
  {
    id: "v4",
    name: "Stable Guardian Vault",
    strategyType: "DeFi Yield",
    riskLevel: 1,
    tvl: "$1.2M",
    apy: "5.2%",
    totalDeposits: "$1.5M",
    status: "active",
    agentId: "a4",
    agentName: "Stable Guardian",
    description: "Ultra-safe stablecoin vault with minimal risk, ideal for capital preservation on Sui.",
    performanceData: [100, 100.1, 100.2, 100.3, 100.4, 100.5, 100.6, 100.7, 100.8, 100.9, 101, 101.1, 101.2, 101.3, 101.4],
    recentExecutions: [
      { id: "e8", timestamp: "15 min ago", agentName: "Stable Guardian", action: "Rebalance to USDC", vaultName: "Stable Guardian Vault", amount: "$50K", result: "success", profit: "+$12" },
    ],
  },
  {
    id: "v5",
    name: "Sui DeFi Rotation",
    strategyType: "DeFi Yield",
    riskLevel: 7,
    tvl: "$280K",
    apy: "31.5%",
    totalDeposits: "$350K",
    status: "active",
    agentId: "a1",
    agentName: "Momentum Alpha",
    description: "Aggressive rotation strategy across all major Sui DeFi protocols maximizing yield.",
    performanceData: [100, 103, 99, 105, 108, 104, 110, 106, 112, 115, 109, 118, 114, 122, 126],
    recentExecutions: [
      { id: "e9", timestamp: "8 min ago", agentName: "Momentum Alpha", action: "Rotate to Scallop", vaultName: "Sui DeFi Rotation", amount: "$15K", result: "success", profit: "+$520" },
      { id: "e10", timestamp: "45 min ago", agentName: "Momentum Alpha", action: "Exit Aries", vaultName: "Sui DeFi Rotation", amount: "$10K", result: "partial", profit: "+$280" },
    ],
  },
  {
    id: "v6",
    name: "Liquid Staking Optimizer",
    strategyType: "Liquid Staking",
    riskLevel: 4,
    tvl: "$110K",
    apy: "15.8%",
    totalDeposits: "$140K",
    status: "paused",
    agentId: "a2",
    agentName: "Yield Harvester",
    description: "Optimized liquid staking strategy leveraging SUI staking derivatives for enhanced returns.",
    performanceData: [100, 101, 102, 101.5, 103, 104, 103.5, 105, 106, 105.5, 107, 108, 107.5, 109, 110],
    recentExecutions: [
      { id: "e11", timestamp: "2h ago", agentName: "Yield Harvester", action: "Stake SUI via Haedal", vaultName: "Liquid Staking Optimizer", amount: "$25K", result: "success", profit: "+$190" },
    ],
  },
];

// ── Agents ──────────────────────────────────────────────────
export const agents: Agent[] = [
  {
    id: "a1",
    name: "Momentum Alpha",
    strategyType: "Momentum Trading",
    riskLevel: 6,
    reputation: 78,
    successRate: 85,
    totalProfit: "$142K",
    status: "executing",
    description: "Identifies and capitalizes on market momentum across Sui DeFi protocols. Uses on-chain data signals and cross-protocol yield differentials to execute high-conviction trades.",
    walrusCid: "bafybeig7kq5x3q3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x",
  },
  {
    id: "a2",
    name: "Yield Harvester",
    strategyType: "Yield Farming",
    riskLevel: 3,
    reputation: 92,
    successRate: 97,
    totalProfit: "$89K",
    status: "analyzing",
    description: "Automatically farms the highest sustainable yields across Sui DEXs with built-in risk management and automatic compounding. Known for consistency over aggression.",
    walrusCid: "bafybeih7kq5x3q3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x",
  },
  {
    id: "a3",
    name: "Arb Sprinter",
    strategyType: "Arbitrage",
    riskLevel: 2,
    reputation: 65,
    successRate: 91,
    totalProfit: "$67K",
    status: "executing",
    description: "Ultra-fast arbitrage execution across Cetus, Turbos, Aftermath, and DeepBook. Capitalizes on micro price differences with minimal exposure time.",
    walrusCid: "bafybeij7kq5x3q3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x",
  },
  {
    id: "a4",
    name: "Stable Guardian",
    strategyType: "Stablecoin Yield",
    riskLevel: 1,
    reputation: 98,
    successRate: 99,
    totalProfit: "$45K",
    status: "idle",
    description: "Ultra-conservative agent focused on stablecoin strategies. Perfect for capital preservation with modest but reliable returns through lending and stable pools.",
    walrusCid: "bafybeik7kq5x3q3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x3c5w4j5w4x3k5r3x",
  },
];

// ── Strategies ──────────────────────────────────────────────
export const strategies: Strategy[] = [
  {
    id: "s1",
    name: "Momentum Breakout",
    description: "Identifies breakout patterns in Sui DeFi token pairs using on-chain volume and price momentum. Enters positions on confirmed breakouts with trailing stop losses.",
    category: "Momentum",
    riskLevel: 6,
    sharpe: 1.85,
    maxDrawdown: 12.4,
    winRate: 72,
    backtestData: [100, 102, 101, 104, 108, 106, 112, 110, 115, 118, 114, 120, 123, 119, 126, 130, 127, 133, 136, 140, 137, 143, 146, 150, 147, 153, 156, 160, 158, 164],
    agentId: "a1",
  },
  {
    id: "s2",
    name: "Yield Compounding Engine",
    description: "Continuously compounds farming rewards across multiple protocols. Automatically shifts capital to the highest yielding pools while managing impermanent loss.",
    category: "Yield Farming",
    riskLevel: 3,
    sharpe: 2.31,
    maxDrawdown: 5.2,
    winRate: 94,
    backtestData: [100, 100.5, 101.1, 101.6, 102.2, 102.8, 103.4, 103.9, 104.5, 105.1, 105.8, 106.3, 106.9, 107.5, 108.2, 108.8, 109.4, 110, 110.6, 111.2, 111.8, 112.4, 113.1, 113.7, 114.3, 114.9, 115.5, 116.2, 116.8, 117.4],
    agentId: "a2",
  },
  {
    id: "s3",
    name: "Flash Arb Multi-DEX",
    description: "Multi-DEX arbitrage strategy exploiting price differences across Cetus, Turbos, Aftermath, and DeepBook with atomic execution and MEV protection.",
    category: "Arbitrage",
    riskLevel: 2,
    sharpe: 3.12,
    maxDrawdown: 1.8,
    winRate: 91,
    backtestData: [100, 100.2, 100.4, 100.3, 100.6, 100.8, 100.7, 101, 101.2, 101.1, 101.4, 101.6, 101.5, 101.8, 102, 101.9, 102.2, 102.4, 102.3, 102.6, 102.8, 102.7, 103, 103.2, 103.1, 103.4, 103.6, 103.5, 103.8, 104],
    agentId: "a3",
  },
  {
    id: "s4",
    name: "Stablecoin Ladder",
    description: "Tiered lending strategy across multiple Sui lending protocols. Allocates capital in risk-graded tranches for optimal risk-adjusted stable returns.",
    category: "Stablecoin",
    riskLevel: 1,
    sharpe: 4.05,
    maxDrawdown: 0.8,
    winRate: 99,
    backtestData: [100, 100.1, 100.2, 100.3, 100.3, 100.4, 100.5, 100.6, 100.6, 100.7, 100.8, 100.9, 100.9, 101, 101.1, 101.2, 101.2, 101.3, 101.4, 101.5, 101.5, 101.6, 101.7, 101.8, 101.8, 101.9, 102, 102.1, 102.1, 102.2],
    agentId: "a4",
  },
];

// ── Activity Feed ───────────────────────────────────────────
export const activityFeed: ActivityFeedItem[] = [
  { id: "f1", timestamp: "12s ago", message: "Momentum Alpha executed swap on Cetus: SUI → USDC ($12.5K)", type: "trade" },
  { id: "f2", timestamp: "45s ago", message: "Arb Sprinter found arbitrage opportunity: +$180 profit", type: "trade" },
  { id: "f3", timestamp: "1m ago", message: "Yield Harvester is analyzing new farming opportunity on Turbos", type: "info" },
  { id: "f4", timestamp: "2m ago", message: "New deposit of $25K into Stable Guardian Vault", type: "deposit" },
  { id: "f5", timestamp: "3m ago", message: "Momentum Alpha Vault rebalanced portfolio allocation", type: "rebalance" },
  { id: "f6", timestamp: "5m ago", message: "Withdrawal of $8K processed from Yield Harvester Vault", type: "withdraw" },
  { id: "f7", timestamp: "7m ago", message: "Arb Sprinter executed 3-flash arb across Cetus → Turbos → DeepBook", type: "trade" },
  { id: "f8", timestamp: "10m ago", message: "Sui DeFi Rotation vault reached new ATH APY: 31.5%", type: "info" },
  { id: "f9", timestamp: "12m ago", message: "Stable Guardian harvested $1.2K in stable yield", type: "trade" },
  { id: "f10", timestamp: "15m ago", message: "New deposit of $50K into Momentum Alpha Vault", type: "deposit" },
];

// ── Dashboard Stats ─────────────────────────────────────────
export const dashboardStats = {
  totalAUM: "$3.4M",
  pnl24h: "+$28.4K (+0.84%)",
  activeAgents: 3,
  rebalancesToday: 14,
};

// ── Portfolio Allocation (for pie chart) ────────────────────
export const portfolioAllocation = [
  { name: "Momentum Alpha Vault", value: 25, color: "#3B82F6" },
  { name: "Yield Harvester Vault", value: 18, color: "#06B6D4" },
  { name: "Arb Sprinter Vault", value: 10, color: "#8B5CF6" },
  { name: "Stable Guardian Vault", value: 35, color: "#22C55E" },
  { name: "Sui DeFi Rotation", value: 8, color: "#F59E0B" },
  { name: "Liquid Staking Optimizer", value: 4, color: "#EF4444" },
];

// ── Rebalance Events ────────────────────────────────────────
export const rebalanceEvents = [
  { id: "r1", timestamp: "5 min ago", vault: "Momentum Alpha Vault", action: "Rotated 20% from Cetus LP to Turbos Supply", agent: "Momentum Alpha" },
  { id: "r2", timestamp: "18 min ago", vault: "Yield Harvester Vault", action: "Harvested and compounded $2.1K rewards", agent: "Yield Harvester" },
  { id: "r3", timestamp: "32 min ago", vault: "Sui DeFi Rotation", action: "Exited Aries Market, entered Scallop Lending", agent: "Momentum Alpha" },
  { id: "r4", timestamp: "1h ago", vault: "Stable Guardian Vault", action: "Rebalanced 50/50 USDC/vSUI allocation", agent: "Stable Guardian" },
  { id: "r5", timestamp: "1.5h ago", vault: "Arb Sprinter Vault", action: "Adjusted capital reserves: +$15K available", agent: "Arb Sprinter" },
];

// ── Helper Functions ────────────────────────────────────────
export function getRiskColor(level: number): string {
  if (level <= 2) return "#22C55E";
  if (level <= 4) return "#06B6D4";
  if (level <= 6) return "#F59E0B";
  if (level <= 8) return "#F97316";
  return "#EF4444";
}

export function getRiskLabel(level: number): string {
  if (level <= 2) return "Low";
  if (level <= 4) return "Medium-Low";
  if (level <= 6) return "Medium";
  if (level <= 8) return "Medium-High";
  return "High";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "active": return "#22C55E";
    case "paused": return "#F59E0B";
    case "deprecated": return "#EF4444";
    default: return "#64748B";
  }
}

export function getResultColor(result: string): string {
  switch (result) {
    case "success": return "#22C55E";
    case "partial": return "#F59E0B";
    case "failed": return "#EF4444";
    default: return "#64748B";
  }
}