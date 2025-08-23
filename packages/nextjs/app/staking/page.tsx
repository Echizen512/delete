"use client"

import { useState } from "react"

type StakingPool = {
  id: number
  name: string
  apy: number
  minStake: number
  lockPeriod: string
}

export default function StakingDashboard() {
  const [selectedDAO, setSelectedDAO] = useState("DeFi Protocol DAO")
  const [stakingAmount, setStakingAmount] = useState("")
  const [selectedPool, setSelectedPool] = useState<number | null>(null)
  const [currentStaked, setCurrentStaked] = useState(15000)
  const [vaultBalance, setVaultBalance] = useState(50000)
  const [calculatorAmount, setCalculatorAmount] = useState("")
  const [calculatorPeriod, setCalculatorPeriod] = useState("30")

  const daos = ["DeFi Protocol DAO", "Green Energy DAO", "Gaming Guild DAO"]

  const stakingPools: StakingPool[] = [
    { id: 1, name: "Flexible Staking", apy: 8.5, minStake: 100, lockPeriod: "No lock" },
    { id: 2, name: "30-Day Lock", apy: 12.0, minStake: 500, lockPeriod: "30 days" },
    { id: 3, name: "90-Day Lock", apy: 18.5, minStake: 1000, lockPeriod: "90 days" },
  ]

  const calculateRewards = () => {
    const amount = Number.parseFloat(calculatorAmount)
    const days = Number.parseInt(calculatorPeriod)
    if (!amount || !days) return 0

    const selectedPoolData = stakingPools.find((p) => p.id === selectedPool)
    if (!selectedPoolData) return 0

    const dailyRate = selectedPoolData.apy / 365 / 100
    return amount * dailyRate * days
  }

  const handleStake = () => {
    const amount = Number.parseFloat(stakingAmount)
    if (!isNaN(amount) && amount > 0 && amount <= vaultBalance) {
      setCurrentStaked(currentStaked + amount)
      setVaultBalance(vaultBalance - amount)
      setStakingAmount("")
      setSelectedPool(null)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with DAO Selector */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold font-mono">🏦 Staking Dashboard</h1>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline font-mono">
              {selectedDAO} ▼
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {daos.map((dao) => (
                <li key={dao}>
                  <a onClick={() => setSelectedDAO(dao)} className="font-mono">
                    {dao}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Vault Balance</div>
              <div className="stat-value font-mono">${vaultBalance.toLocaleString()}</div>
              <div className="stat-desc font-mono">Available to stake</div>
            </div>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Currently Staked</div>
              <div className="stat-value text-success font-mono">${currentStaked.toLocaleString()}</div>
              <div className="stat-desc font-mono">Earning rewards</div>
            </div>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Total Rewards</div>
              <div className="stat-value font-mono">$1,250</div>
              <div className="stat-desc font-mono">All time earned</div>
            </div>
          </div>
        </div>

        {/* Staking Calculator */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">📊 Staking Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-mono">Amount</span>
              </label>
              <input
                type="number"
                value={calculatorAmount}
                onChange={(e) => setCalculatorAmount(e.target.value)}
                placeholder="Enter amount"
                className="input input-bordered font-mono"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-mono">Period (days)</span>
              </label>
              <input
                type="number"
                value={calculatorPeriod}
                onChange={(e) => setCalculatorPeriod(e.target.value)}
                placeholder="30"
                className="input input-bordered font-mono"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-mono">Pool</span>
              </label>
              <select
                value={selectedPool || ""}
                onChange={(e) => setSelectedPool(Number(e.target.value))}
                className="select select-bordered font-mono"
              >
                <option value="">Select pool</option>
                {stakingPools.map((pool) => (
                  <option key={pool.id} value={pool.id}>
                    {pool.name} ({pool.apy}% APY)
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-success text-success-content p-4 rounded-lg text-center">
              <div className="font-mono text-sm">Estimated Rewards</div>
              <div className="font-mono text-xl font-bold">${calculateRewards().toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Staking Pools */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">🎯 Available Staking Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stakingPools.map((pool) => (
              <div key={pool.id} className="border border-base-300 p-4 rounded-lg hover:bg-base-50 transition-colors">
                <h3 className="font-bold font-mono text-lg">{pool.name}</h3>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-mono text-sm">APY:</span>
                    <span className="font-mono text-sm font-bold text-success">{pool.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm">Min Stake:</span>
                    <span className="font-mono text-sm">${pool.minStake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm">Lock Period:</span>
                    <span className="font-mono text-sm">{pool.lockPeriod}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPool(pool.id)}
                  className={`btn btn-sm w-full mt-3 font-mono ${selectedPool === pool.id ? "btn-primary" : "btn-outline"}`}
                >
                  {selectedPool === pool.id ? "Selected" : "Select Pool"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Staking Form */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">💰 Stake Funds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-mono">Amount to Stake</span>
              </label>
              <input
                type="number"
                value={stakingAmount}
                onChange={(e) => setStakingAmount(e.target.value)}
                placeholder="Enter amount"
                className="input input-bordered font-mono"
                max={vaultBalance}
              />
              <label className="label">
                <span className="label-text-alt font-mono">Max: ${vaultBalance.toLocaleString()}</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-mono">Selected Pool</span>
              </label>
              <div className="input input-bordered flex items-center font-mono">
                {selectedPool ? stakingPools.find((p) => p.id === selectedPool)?.name : "No pool selected"}
              </div>
            </div>
            <button
              onClick={handleStake}
              disabled={!stakingAmount || !selectedPool || Number.parseFloat(stakingAmount) > vaultBalance}
              className="btn btn-success font-mono"
            >
              🚀 Stake Now
            </button>
          </div>
        </div>

        {/* Current Stakes */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">📈 Your Active Stakes</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra font-mono">
              <thead>
                <tr>
                  <th>Pool</th>
                  <th>Amount</th>
                  <th>APY</th>
                  <th>Start Date</th>
                  <th>Unlock Date</th>
                  <th>Rewards</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30-Day Lock</td>
                  <td>$10,000</td>
                  <td>12.0%</td>
                  <td>2024-08-01</td>
                  <td>2024-08-31</td>
                  <td className="text-success">$98.63</td>
                  <td>
                    <button className="btn btn-xs btn-outline font-mono">Unstake</button>
                  </td>
                </tr>
                <tr>
                  <td>Flexible Staking</td>
                  <td>$5,000</td>
                  <td>8.5%</td>
                  <td>2024-07-15</td>
                  <td>Anytime</td>
                  <td className="text-success">$156.25</td>
                  <td>
                    <button className="btn btn-xs btn-success font-mono">Unstake</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}