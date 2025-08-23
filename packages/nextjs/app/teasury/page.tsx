"use client"
import { useState } from "react"

export default function DAOVault() {
  const [selectedDAO, setSelectedDAO] = useState("DeFi Protocol DAO")
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [vaultTotal, setVaultTotal] = useState(2500000)
  const [stakingAmount, setStakingAmount] = useState(150000)

  const daos = ["DeFi Protocol DAO", "Green Energy DAO", "Gaming Guild DAO"]

  const transactions = [
    { id: 1, type: "deposit", amount: 50000, date: "20-08-2025", from: "0x1234...abcd" },
    { id: 2, type: "withdraw", amount: 25000, date: "20-08-2025", to: "Staking Pool" },
    { id: 3, type: "deposit", amount: 120000, date: "20-08-2025", from: "0x5678...efgh" },
    { id: 4, type: "reward", amount: 5000, date: "20-08-2025", from: "Staking Rewards" },
  ]

  const allocations = [
    {
      category: "Available",
      amount: vaultTotal - stakingAmount,
      percentage: (((vaultTotal - stakingAmount) / vaultTotal) * 100).toFixed(1),
    },
    { category: "Staked", amount: stakingAmount, percentage: ((stakingAmount / vaultTotal) * 100).toFixed(1) },
  ]

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount)
    if (!isNaN(amount) && amount > 0) {
      setVaultTotal(vaultTotal + amount)
      setDepositAmount("")
      setIsDepositModalOpen(false)
    }
  }

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount)
    if (!isNaN(amount) && amount > 0 && amount <= vaultTotal - stakingAmount) {
      setVaultTotal(vaultTotal - amount)
      setWithdrawAmount("")
      setIsWithdrawModalOpen(false)
    }
  }

  const transferToStaking = () => {
    // This would integrate with the staking component
    alert("Transfer to Staking functionality - would redirect to Staking page")
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with DAO Selector */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold font-mono">🏦 DAO Vault</h1>
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

        {/* Vault Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Total Vault</div>
              <div className="stat-value font-mono">${vaultTotal.toLocaleString()}</div>
              <div className="stat-desc font-mono">All funds</div>
            </div>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Available</div>
              <div className="stat-value text-success font-mono">${(vaultTotal - stakingAmount).toLocaleString()}</div>
              <div className="stat-desc font-mono">Ready to use</div>
            </div>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Staked</div>
              <div className="stat-value text-warning font-mono">${stakingAmount.toLocaleString()}</div>
              <div className="stat-desc font-mono">Earning rewards</div>
            </div>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="stat">
              <div className="stat-title font-mono">Monthly Growth</div>
              <div className="stat-value font-mono">+8.5%</div>
              <div className="stat-desc font-mono">This month</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">⚡ Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setIsDepositModalOpen(true)} className="btn btn-success font-mono">
              ➕ Deposit Funds
            </button>
            <button onClick={() => setIsWithdrawModalOpen(true)} className="btn btn-warning font-mono">
              ➖ Withdraw Funds
            </button>
            <button onClick={transferToStaking} className="btn btn-outline font-mono">
              🚀 Transfer to Staking
            </button>
          </div>
        </div>

        {/* Fund Allocation */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">📊 Fund Allocation</h2>
          <div className="space-y-4">
            {allocations.map((allocation, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${idx === 0 ? "bg-success" : "bg-warning"}`}></div>
                  <span className="font-mono font-bold">{allocation.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold">${allocation.amount.toLocaleString()}</div>
                  <div className="font-mono text-sm text-base-content/60">{allocation.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-mono mb-4">📝 Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra font-mono">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>From/To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div
                        className={`badge ${tx.type === "deposit" ? "badge-success" : tx.type === "withdraw" ? "badge-warning" : "badge-info"}`}
                      >
                        {tx.type.toUpperCase()}
                      </div>
                    </td>
                    <td className="font-bold">
                      {tx.type === "withdraw" ? "-" : "+"}${tx.amount.toLocaleString()}
                    </td>
                    <td>{tx.date}</td>
                    <td>{tx.from || tx.to}</td>
                    <td>
                      <div className="badge badge-success">Completed</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg font-mono">💰 Deposit to Vault</h3>
            <p className="py-2 font-mono text-sm">Enter the amount you want to deposit (USD)</p>
            <div className="form-control">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="input input-bordered w-full font-mono"
              />
            </div>
            <div className="modal-action">
              <button onClick={handleDeposit} className="btn btn-success font-mono">
                Confirm Deposit
              </button>
              <button onClick={() => setIsDepositModalOpen(false)} className="btn btn-outline font-mono">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg font-mono">💸 Withdraw from Vault</h3>
            <p className="py-2 font-mono text-sm">Enter the amount you want to withdraw (USD)</p>
            <p className="text-sm text-base-content/60 font-mono mb-2">
              Available: ${(vaultTotal - stakingAmount).toLocaleString()}
            </p>
            <div className="form-control">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="e.g. 25000"
                className="input input-bordered w-full font-mono"
                max={vaultTotal - stakingAmount}
              />
            </div>
            <div className="modal-action">
              <button
                onClick={handleWithdraw}
                className="btn btn-warning font-mono"
                disabled={Number.parseFloat(withdrawAmount) > vaultTotal - stakingAmount}
              >
                Confirm Withdrawal
              </button>
              <button onClick={() => setIsWithdrawModalOpen(false)} className="btn btn-outline font-mono">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
