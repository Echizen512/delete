"use client"
import { useState } from "react"

export default function DAOTreasury() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [treasuryTotal, setTreasuryTotal] = useState(2500000)

  const recentDeposits = [
    { label: "Aug 10", amount: 50000 },
    { label: "Aug 15", amount: 120000 },
    { label: "Aug 18", amount: 30000 },
    { label: "Aug 20", amount: 75000 },
  ]

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (!isNaN(amount) && amount > 0) {
      setTreasuryTotal(treasuryTotal + amount)
      setDepositAmount("")
      setIsDepositModalOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold font-mono">💰 DAO Treasury</h1>
          <div className="tooltip" data-tip="Withdrawals are currently disabled">
            <button className="btn btn-outline btn-disabled font-mono">
              🔒 Withdraw
            </button>
          </div>
        </div>

        {/* Treasury Stats */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title font-mono">Total Treasury</h2>
                <p className="text-3xl font-bold font-mono">${treasuryTotal.toLocaleString()}</p>
                <p className="text-sm text-base-content/60 font-mono">Last updated: just now</p>
              </div>
              <button onClick={() => setIsDepositModalOpen(true)} className="btn btn-success font-mono">
                ➕ Deposit Funds
              </button>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title font-mono">📊 Recent Deposits</h2>
            <div className="grid grid-cols-4 gap-6 mt-6">
              {recentDeposits.map((d, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div
                    className="bg-success w-8 rounded transition-all duration-300 group-hover:scale-105"
                    style={{ height: `${d.amount / 2000}px` }}
                  ></div>
                  <span className="text-xs mt-2 font-mono">{d.label}</span>
                  <span className="text-xs text-base-content/60 font-mono">${d.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg font-mono">Deposit to Treasury</h3>
            <p className="py-2 font-mono text-sm">Enter the amount you want to deposit (USD)</p>
            <div className="form-control">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="input input-bordered w-full font-mono"
              />
              {depositAmount && parseFloat(depositAmount) <= 0 && (
                <p className="text-error text-xs mt-1 font-mono">Amount must be greater than zero</p>
              )}
            </div>
            <div className="modal-action">
              <button
                onClick={handleDeposit}
                className="btn btn-success font-mono"
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
              >
                Confirm
              </button>
              <button onClick={() => setIsDepositModalOpen(false)} className="btn btn-outline font-mono">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
