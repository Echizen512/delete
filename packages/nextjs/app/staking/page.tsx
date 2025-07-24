"use client"

import { useState } from "react"
import { Calculator, TrendingUp, Lock, Unlock, DollarSign, Percent } from "lucide-react"

// Staking Form Component
const StakingForm = ({
    stakingPools,
    selectedPool,
    setSelectedPool,
    stakeAmount,
    setStakeAmount,
    stakingPeriod,
    setStakingPeriod,
}: any) => (
    <div className="bg-secondary/40 rounded-4xl p-6">
        <div className="mb-6">
            <h2 className="text-xl font-bold font-mono mb-2 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Stake Tokens
            </h2>
            <p className="text-gray-400 font-mono">Choose your staking pool and amount</p>
        </div>
        <div className="space-y-4">
            <div>
                <label className="text-gray-500 text-sm font-medium mb-2 block font-mono">Select Pool</label>
                <select
                    value={selectedPool}
                    onChange={(e) => setSelectedPool(e.target.value)}
                    className="w-full bg-primary/50 rounded-xl text-gray-500 px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
                >
                    {stakingPools.map((pool: any) => (
                        <option key={pool.id} value={pool.id}>
                            {pool.name} ({pool.apy}% APY)
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="text-gray-500 text-sm font-medium mb-2 block font-mono">Amount to Stake</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full bg-primary/50 rounded-xl text-gray-500 px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
                />
            </div>
            <div>
                <label className="text-gray-500 text-sm font-medium mb-2 block font-mono">Staking Period (days)</label>
                <select
                    value={stakingPeriod}
                    onChange={(e) => setStakingPeriod(e.target.value)}
                    className="w-full bg-primary/50 rounded-xl text-gray-500 px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
                >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">365 days</option>
                </select>
            </div>
            <button className="w-full rounded-4xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 font-mono font-bold transition-colors border-2 border-cyan-400">
                Stake Tokens
            </button>
        </div>
    </div>
)

// Rewards Calculator Component
const RewardsCalculator = ({ rewardCalculation }: any) => (
    <div className="bg-secondary/40 rounded-4xl p-6">
        <div className="mb-6">
            <h2 className="text-xl font-bold font-mono mb-2 flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Rewards Calculator
            </h2>
            <p className="text-gray-400 font-mono">Estimate your staking rewards</p>
        </div>
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/50  p-4 rounded-lg">
                    <div className="text-gray-600 text-sm font-mono">Principal</div>
                    <div className="text-white text-xl font-bold font-mono">{rewardCalculation.principal.toFixed(2)}</div>
                </div>
                <div className="bg-primary/50  p-4 rounded-lg">
                    <div className="text-gray-600 text-sm font-mono">Est. Rewards</div>
                    <div className="text-green-400 text-xl font-bold font-mono">{rewardCalculation.rewards.toFixed(2)}</div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border-2 border-cyan-500/30">
                <div className="text-sm font-mono">Total Return</div>
                <div className="text-cyan-400 text-2xl font-bold font-mono">{rewardCalculation.total.toFixed(2)}</div>
                <div className="text-gray-400 text-sm font-mono">APY: {rewardCalculation.apy}%</div>
            </div>
        </div>
    </div>
)

// Staking Pools Component
const StakingPools = ({ stakingPools, setSelectedPool }: any) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500/20 text-green-400 border-green-500 rounded-full"
            case "Completed":
                return "bg-blue-500/20 text-blue-400 border-blue-500 rounded-full"
            case "Pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500 rounded-full"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500 rounded-full"
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakingPools.map((pool: any) => (
                <div
                    key={pool.id}
                    className="bg-secondary/40 rounded-4xl hover:border-cyan-500/50 transition-all duration-300 p-6"
                >
                    <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 text-sm font-mono font-bold rounded-4xl">{pool.symbol}</span>
                            <span className={`px-3 py-1 text-sm font-mono font-bold border ${getStatusColor(pool.status)}`}>
                                {pool.status.toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-white text-xl font-bold font-mono mb-2">{pool.name}</h3>
                    </div>
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">APY</span>
                            <span className="text-green-400 font-bold flex items-center font-mono">
                                <Percent className="h-4 w-4 mr-1" />
                                {pool.apy}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Total Staked</span>
                            <span className="text-white font-mono">{pool.totalStaked}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Min Stake</span>
                            <span className="text-white font-mono">
                                {pool.minStake} {pool.symbol}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-mono">Lock Period</span>
                            <span className="text-white font-mono">{pool.lockPeriod}</span>
                        </div>
                    </div>
                    <button
                        className="w-full rounded-4xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 font-mono font-bold transition-colors border-2 border-cyan-400"
                        onClick={() => setSelectedPool(pool.id)}
                    >
                        Select Pool
                    </button>
                </div>
            ))}
        </div>
    )
}

// User Stakes Portfolio Component
const UserStakesPortfolio = ({ userStakes }: any) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500/20 text-green-400 border-green-500 rounded-full"
            case "Completed":
                return "bg-blue-500/20 text-blue-400 border-blue-500 rounded-full"
            case "Pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500 rounded-full"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500 rounded-full"
        }
    }

    return (
        <div className="space-y-6">
            {userStakes.map((stake: any) => (
                <div key={stake.id} className="bg-secondary/40 p-6 rounded-4xl">
                    <div className="mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white text-xl font-bold font-mono">{stake.pool}</h3>
                                <p className="text-gray-400 font-mono">Staked on {stake.startDate}</p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-mono font-bold border ${getStatusColor(stake.status)}`}>
                                {stake.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-primary/50  p-4 rounded-lg">
                            <div className="text-gray-400 text-sm font-mono">Staked Amount</div>
                            <div className="text-white text-xl font-bold flex items-center font-mono">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {stake.amount}
                            </div>
                        </div>
                        <div className="bg-primary/50  p-4 rounded-lg">
                            <div className="text-gray-400 text-sm font-mono">Rewards Earned</div>
                            <div className="text-green-400 text-xl font-bold flex items-center font-mono">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                {stake.rewards}
                            </div>
                        </div>
                        <div className="bg-primary/50  p-4 rounded-lg">
                            <div className="text-gray-400 text-sm font-mono">End Date</div>
                            <div className="text-white text-lg font-semibold font-mono">{stake.endDate}</div>
                        </div>
                        <div className="bg-primary/50  p-4 rounded-lg">
                            <div className="text-gray-400 text-sm font-mono">Total Value</div>
                            <div className="text-cyan-400 text-xl font-bold font-mono">
                                {(stake.amount + stake.rewards).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="rounded-4xl border-2 border-gray-600 text-gray-300 hover:bg-gray-700 px-4 py-2 font-mono font-bold transition-colors flex items-center">
                            <Unlock className="mr-2 h-4 w-4" />
                            Unstake
                        </button>
                        <button className="rounded-4xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 font-mono font-bold transition-colors border-2 border-green-400">
                            Claim Rewards
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }: any) => {
    const tabs = [
        { id: "stake", label: "Stake" },
        { id: "pools", label: "Pools" },
        { id: "portfolio", label: "My Stakes" },
    ]

    return (
        <div className="flex w-full bg-secondary/40 rounded-4xl mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-3 rounded-4xl font-mono font-bold transition-colors border-r-2 border-gray-700 last:border-r-0 ${activeTab === tab.id ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white" : "text-gray-500 hover:bg-gray-700"
                        }`}
                >
                    {tab.label.toUpperCase()}
                </button>
            ))}
        </div>
    )
}

// Main Staking Screen Component
export default function StakingScreen() {
    const [stakeAmount, setStakeAmount] = useState("")
    const [stakingPeriod, setStakingPeriod] = useState("30")
    const [selectedPool, setSelectedPool] = useState("dao-token")
    const [activeTab, setActiveTab] = useState("stake")

    const stakingPools = [
        {
            id: "dao-token",
            name: "DAO Token",
            symbol: "DAO",
            apy: 12.5,
            totalStaked: "2.5M",
            minStake: 100,
            lockPeriod: "30 days",
            status: "Active",
        },
        {
            id: "defi-token",
            name: "DeFi Protocol Token",
            symbol: "DFI",
            apy: 18.2,
            totalStaked: "1.8M",
            minStake: 50,
            lockPeriod: "60 days",
            status: "Active",
        },
        {
            id: "green-token",
            name: "Green Energy Token",
            symbol: "GRN",
            apy: 15.7,
            totalStaked: "3.2M",
            minStake: 200,
            lockPeriod: "90 days",
            status: "Active",
        },
    ]

    const userStakes = [
        {
            id: 1,
            pool: "DAO Token",
            amount: 1000,
            rewards: 45.2,
            startDate: "2024-01-15",
            endDate: "2024-02-14",
            status: "Active",
        },
        {
            id: 2,
            pool: "DeFi Protocol Token",
            amount: 500,
            rewards: 12.8,
            startDate: "2024-01-20",
            endDate: "2024-03-20",
            status: "Active",
        },
    ]

    const calculateRewards = () => {
        const amount = Number.parseFloat(stakeAmount) || 0
        const period = Number.parseInt(stakingPeriod) || 30
        const selectedPoolData = stakingPools.find((pool) => pool.id === selectedPool)
        const apy = selectedPoolData?.apy || 0

        const dailyRate = apy / 365 / 100
        const rewards = amount * dailyRate * period

        return {
            principal: amount,
            rewards: rewards,
            total: amount + rewards,
            apy: apy,
        }
    }

    const rewardCalculation = calculateRewards()

    return (
        <div className="min-h-screen bg-primary pt-8">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text mb-2 font-mono">
                        Staking 
                    </h1>
                    <p className="text-gray-500 text-lg font-mono">Stake your tokens and earn rewards</p>
                </div>

                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab Content */}
                {activeTab === "stake" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-4xl">
                        <StakingForm
                            stakingPools={stakingPools}
                            selectedPool={selectedPool}
                            setSelectedPool={setSelectedPool}
                            stakeAmount={stakeAmount}
                            setStakeAmount={setStakeAmount}
                            stakingPeriod={stakingPeriod}
                            setStakingPeriod={setStakingPeriod}
                        />
                        <RewardsCalculator rewardCalculation={rewardCalculation} />
                    </div>
                )}

                {activeTab === "pools" && <StakingPools stakingPools={stakingPools} setSelectedPool={setSelectedPool} />}

                {activeTab === "portfolio" && <UserStakesPortfolio userStakes={userStakes} />}
            </div>
        </div>
    )
}
