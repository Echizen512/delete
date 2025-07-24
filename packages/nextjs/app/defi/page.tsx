"use client"

import { useState } from "react"
import { ArrowUpDown, TrendingUp, DollarSign, Percent, Calculator, Zap } from "lucide-react"


const TokenSwap = ({
  tokens,
  swapFromAmount,
  setSwapFromAmount,
  swapFromToken,
  setSwapFromToken,
  swapToToken,
  setSwapToToken,
  calculateSwap,
}: any) => (
  <div className="bg-secondary/40 p-6 rounded-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold font-mono mb-2 flex items-center">
        <ArrowUpDown className="mr-2 h-5 w-5" />
        Token Swap
      </h2>
      <p className="font-mono">Exchange tokens at the best rates</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium font-mono">From</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="0.0"
            value={swapFromAmount}
            onChange={(e) => setSwapFromAmount(e.target.value)}
            className="flex-1 bg-secondary/50 border-gray-600 px-4 py-3 font-mono rounded-3xl focus:border-cyan-400 focus:outline-none"
          />
          <select
            value={swapFromToken}
            onChange={(e) => setSwapFromToken(e.target.value)}
            className="bg-secondary/50 border-gray-600 px-4 py-3 font-mono rounded-3xl focus:border-cyan-400 focus:outline-none min-w-[100px]"
          >
            {tokens.map((token: any) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="border-gray-600 text-gray-300 hover:bg-gray-700 p-3 font-mono font-bold transition-colors"
          onClick={() => {
            const temp = swapFromToken
            setSwapFromToken(swapToToken)
            setSwapToToken(temp)
          }}
        >
          <ArrowUpDown className="h-6 w-6 border-2 rounded-full" />
        </button>
      </div>

      <div>
        <label className="text-sm font-medium font-mono">To</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="0.0"
            value={calculateSwap()}
            readOnly
            className="flex-1 bg-secondary/50 border-gray-600 px-4 py-3 font-mono rounded-3xl focus:border-cyan-400 focus:outline-none"
          />
          <select
            value={swapToToken}
            onChange={(e) => setSwapToToken(e.target.value)}
            className="bg-secondary/50 border-gray-600 px-4 py-3 rounded-3xl font-mono focus:border-cyan-400 focus:outline-none min-w-[100px]"
          >
            {tokens.map((token: any) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-secondary/40 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="font-mono">Exchange Rate</span>
          <span className="font-mono">
            1 {swapFromToken} ={" "}
            {(tokens.find((t: any) => t.symbol === swapFromToken)?.price || 0) /
              (tokens.find((t: any) => t.symbol === swapToToken)?.price || 1)}{" "}
            {swapToToken}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-mono">Slippage</span>
          <span className="font-mono">0.5%</span>
        </div>
      </div>

      <button className="w-full text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 font-mono font-bold transition-colors border-cyan-400 flex items-center justify-center">
        <Zap className="mr-2 h-4 w-4" />
        Swap Tokens
      </button>
    </div>
  </div>
)


const TokenPrices = ({ tokens }: any) => (
  <div className="bg-secondary/40 p-6 rounded-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold font-mono">Token Prices</h2>
    </div>
    <div className="space-y-3">
      {tokens.map((token: any) => (
        <div key={token.symbol} className="flex justify-between items-center p-3 bg-primary/70 rounded-lg">
          <div>
            <div className="font-medium font-mono">{token.symbol}</div>
            <div className="text-sm font-mono text-gray-500">{token.name}</div>
          </div>
          <div className="text-right">
            <div className="font-bold font-mono text-gray-500">${token.price.toLocaleString()}</div>
            <div className={`text-sm font-mono ${token.change >= 0 ? "text-green-500" : "text-red-400"}`}>
              {token.change >= 0 ? "+" : ""}
              {token.change}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)


const LiquidityManagement = ({
  liquidityTokenA,
  setLiquidityTokenA,
  liquidityTokenB,
  setLiquidityTokenB,
  calculateLiquidityValue,
}: any) => (
  <div className="bg-secondary/40 p-6 rounded-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold font-mono">Add Liquidity</h2>
      <p className="font-mono">Provide liquidity and earn fees</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium font-mono">Token A (ETH)</label>
        <input
          type="number"
          placeholder="0.0"
          value={liquidityTokenA}
          onChange={(e) => setLiquidityTokenA(e.target.value)}
          className="w-full bg-secondary/50 border-gray-600 rounded-3xl px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium font-mono">Token B (USDC)</label>
        <input
          type="number"
          placeholder="0.0"
          value={liquidityTokenB}
          onChange={(e) => setLiquidityTokenB(e.target.value)}
          className="w-full bg-secondary/50 border-gray-600 rounded-3xl px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
        />
      </div>
      <div className="bg-secondary/40 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="font-mono">Total Value</span>
          <span className="font-mono">${calculateLiquidityValue()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-mono">Pool Share</span>
          <span className="font-mono">0.01%</span>
        </div>
      </div>
      <button className="w-full rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 font-mono font-bold transition-colors border-cyan-400">
        Add Liquidity
      </button>
    </div>
  </div>
)


const LiquidityPools = ({ liquidityPools }: any) => (
  <div className="bg-secondary/40 p-6 rounded-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold font-mono">Liquidity Pools</h2>
    </div>
    <div className="space-y-3">
      {liquidityPools.map((pool: any) => (
        <div key={pool.pair} className="p-3 bg-primary/70 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium font-mono">{pool.pair}</div>
            <span className="bg-green-500/20 text-green-500 rounded-full px-3 py-1 text-sm font-mono font-bold">
              {pool.apy}% APY
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-mono text-gray-500">TVL: </span>
              <span className="font-mono">{pool.tvl}</span>
            </div>
            <div>
              <span className="font-mono text-gray-500">24h Vol: </span>
              <span className="font-mono">{pool.volume24h}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)


const LendingInterface = ({ lendAmount, setLendAmount, borrowAmount, setBorrowAmount }: any) => (
  <div className="bg-secondary/40 p-6 rounded-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold font-mono">Lend & Borrow</h2>
      <p className="font-mono">Earn interest or borrow against collateral</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium font-mono">Lend Amount</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="0.0"
            value={lendAmount}
            onChange={(e) => setLendAmount(e.target.value)}
            className="flex-1 bg-secondary/50 border-gray-600 rounded-3xl px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
          />
          <select className="bg-secondary/50 border-gray-600 rounded-3xl  px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none min-w-[100px]">
            <option>ETH</option>
            <option>USDC</option>
            <option>DAI</option>
          </select>
        </div>
      </div>
      <button className="w-full text-white rounded-4xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3 font-mono font-bold transition-colors border-green-400">
        Supply
      </button>

      <div className="space-y-2">
        <label className="text-sm font-medium font-mono">Borrow Amount</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="0.0"
            value={borrowAmount}
            onChange={(e) => setBorrowAmount(e.target.value)}
            className="flex-1 bg-secondary/50 border-gray-600 rounded-3xl  px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
          />
          <select className="bg-secondary/50 border-gray-600 rounded-3xl  px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none min-w-[100px]">
            <option>USDC</option>
            <option>DAI</option>
            <option>ETH</option>
          </select>
        </div>
      </div>
      <button className="w-full text-white rounded-4xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-6 py-3 font-mono font-bold transition-colors border-orange-400">
        Borrow
      </button>
    </div>
  </div>
)


const LendingMarkets = ({ lendingPools }: any) => (
  <div className="bg-secondary/40 p-6 rounded-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold font-mono">Lending Markets</h2>
    </div>
    <div className="space-y-3">
      {lendingPools.map((pool: any) => (
        <div key={pool.asset} className="p-3 bg-primary/70 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium font-mono">{pool.asset}</div>
            <div className="text-sm font-mono text-gray-500">{pool.utilization}% utilized</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-mono text-gray-500">Supply APY: </span>
              <span className="text-green-500 font-mono">{pool.supplyAPY}%</span>
            </div>
            <div>
              <span className="font-mono text-gray-500">Borrow APY: </span>
              <span className="text-red-400 font-mono">{pool.borrowAPY}%</span>
            </div>
          </div>
          <div className="text-sm mt-1">
            <span className="font-mono text-gray-500">Total Supply: </span>
            <span className="font-mono">{pool.totalSupply}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)


const AnalyticsDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-secondary/40 p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-mono">Total Value Locked</p>
          <p className="text-2xl text-gray-400 font-bold font-mono">$2.4B</p>
        </div>
        <DollarSign className="h-8 w-8 text-cyan-400" />
      </div>
      <div className="text-green-500 text-sm mt-2 font-mono">+5.2% from last week</div>
    </div>

    <div className="bg-secondary/40 p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-mono">24h Volume</p>
          <p className="text-2xl text-gray-400 font-bold font-mono">$125M</p>
        </div>
        <TrendingUp className="h-8 w-8 text-green-400" />
      </div>
      <div className="text-green-500 text-sm mt-2 font-mono">+12.8% from yesterday</div>
    </div>

    <div className="bg-secondary/40 p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-mono">Active Users</p>
          <p className="text-2xl text-gray-400 font-bold font-mono">45.2K</p>
        </div>
        <Calculator className="h-8 w-8 text-blue-400" />
      </div>
      <div className="text-green-500  text-sm mt-2 font-mono">+8.1% from last month</div>
    </div>

    <div className="bg-secondary/40 p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-mono">Avg APY</p>
          <p className="text-2xl text-gray-400 font-bold font-mono">12.4%</p>
        </div>
        <Percent className="h-8 w-8 text-purple-400" />
      </div>
      <div className="text-red-400 text-sm mt-2 font-mono">-0.3% from last week</div>
    </div>
  </div>
)


const TabNavigation = ({ activeTab, setActiveTab }: any) => {
  const tabs = [
    { id: "swap", label: "Swap" },
    { id: "liquidity", label: "Liquidity" },
    { id: "lending", label: "Lending" },
    { id: "analytics", label: "Analytics" },
  ]

  return (
<div className="flex w-full bg-secondary/40 mb-6 gap-x-2 rounded-xl">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex-1 px-6 py-3 font-mono font-bold transition-colors rounded-xl ${
        activeTab === tab.id ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white" : "text-gray-400 hover:bg-gray-500"
      }`}
    >
      {tab.label.toUpperCase()}
    </button>
  ))}
</div>

  )
}


export default function DeFiScreen() {
  const [swapFromAmount, setSwapFromAmount] = useState("")
  const [swapFromToken, setSwapFromToken] = useState("ETH")
  const [swapToToken, setSwapToToken] = useState("USDC")
  const [liquidityTokenA, setLiquidityTokenA] = useState("")
  const [liquidityTokenB, setLiquidityTokenB] = useState("")
  const [lendAmount, setLendAmount] = useState("")
  const [borrowAmount, setBorrowAmount] = useState("")
  const [activeTab, setActiveTab] = useState("swap")

  const tokens = [
    { symbol: "ETH", name: "Ethereum", price: 2340.5, change: 2.5 },
    { symbol: "USDC", name: "USD Coin", price: 1.0, change: 0.1 },
    { symbol: "DAI", name: "Dai Stablecoin", price: 0.999, change: -0.1 },
    { symbol: "WBTC", name: "Wrapped Bitcoin", price: 43250.0, change: 1.8 },
    { symbol: "UNI", name: "Uniswap", price: 8.45, change: -1.2 },
  ]

  const liquidityPools = [
    { pair: "ETH/USDC", tvl: "$125M", apy: 15.2, volume24h: "$2.5M" },
    { pair: "DAI/USDC", tvl: "$89M", apy: 8.7, volume24h: "$1.8M" },
    { pair: "WBTC/ETH", tvl: "$67M", apy: 12.4, volume24h: "$1.2M" },
    { pair: "UNI/ETH", tvl: "$45M", apy: 18.9, volume24h: "$890K" },
  ]

  const lendingPools = [
    { asset: "ETH", supplyAPY: 3.2, borrowAPY: 5.8, utilization: 78, totalSupply: "$45M" },
    { asset: "USDC", supplyAPY: 4.1, borrowAPY: 6.5, utilization: 85, totalSupply: "$89M" },
    { asset: "DAI", supplyAPY: 3.8, borrowAPY: 6.2, utilization: 82, totalSupply: "$67M" },
    { asset: "WBTC", supplyAPY: 2.9, borrowAPY: 5.4, utilization: 72, totalSupply: "$23M" },
  ]

  const calculateSwap = () => {
    const fromAmount = Number.parseFloat(swapFromAmount) || 0
    const fromPrice = tokens.find((t) => t.symbol === swapFromToken)?.price || 0
    const toPrice = tokens.find((t) => t.symbol === swapToToken)?.price || 0

    if (fromPrice && toPrice) {
      return ((fromAmount * fromPrice) / toPrice).toFixed(6)
    }
    return "0"
  }

  const calculateLiquidityValue = () => {
    const amountA = Number.parseFloat(liquidityTokenA) || 0
    const amountB = Number.parseFloat(liquidityTokenB) || 0
    const priceA = tokens.find((t) => t.symbol === "ETH")?.price || 0
    const priceB = tokens.find((t) => t.symbol === "USDC")?.price || 0

    return (amountA * priceA + amountB * priceB).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-primary pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text mb-2 font-mono">
            DeFi
          </h1>
          <p className="text-lg font-mono">Advanced decentralized finance tools and protocols</p>
        </div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "swap" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TokenSwap
              tokens={tokens}
              swapFromAmount={swapFromAmount}
              setSwapFromAmount={setSwapFromAmount}
              swapFromToken={swapFromToken}
              setSwapFromToken={setSwapFromToken}
              swapToToken={swapToToken}
              setSwapToToken={setSwapToToken}
              calculateSwap={calculateSwap}
            />
            <TokenPrices tokens={tokens} />
          </div>
        )}

        {activeTab === "liquidity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiquidityManagement
              liquidityTokenA={liquidityTokenA}
              setLiquidityTokenA={setLiquidityTokenA}
              liquidityTokenB={liquidityTokenB}
              setLiquidityTokenB={setLiquidityTokenB}
              calculateLiquidityValue={calculateLiquidityValue}
            />
            <LiquidityPools liquidityPools={liquidityPools} />
          </div>
        )}

        {activeTab === "lending" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LendingInterface
              lendAmount={lendAmount}
              setLendAmount={setLendAmount}
              borrowAmount={borrowAmount}
              setBorrowAmount={setBorrowAmount}
            />
            <LendingMarkets lendingPools={lendingPools} />
          </div>
        )}

        {activeTab === "analytics" && <AnalyticsDashboard />}
      </div>
    </div>
  )
}
