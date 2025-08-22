"use client"
import { useState } from "react"

type Task = {
  id: number
  title: string
  dao: string
  deadline: string
  reward: string
  status: "pending" | "approved" | "rejected"
}

export default function AuditorDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Audit Treasury Contract", dao: "DeFi Protocol DAO", deadline: "2024-09-01", reward: "400 USDC", status: "pending" },
    { id: 2, title: "Review Governance Proposal", dao: "Green Energy DAO", deadline: "2024-09-05", reward: "250 USDC", status: "pending" },
    { id: 3, title: "Validate Staking Logic", dao: "Gaming Guild DAO", deadline: "2024-09-10", reward: "300 USDC", status: "pending" },
  ])

  const handleTaskAction = (id: number, action: "approved" | "rejected") => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: action } : t))
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold font-mono mb-8">Auditor Panel</h1>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title font-mono">📝 Pending Tasks</h2>
            <div className="overflow-x-auto mt-4">
              <table className="table table-sm font-mono">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>DAO</th>
                    <th>Deadline</th>
                    <th>Reward</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td className="text-info">{task.dao}</td>
                      <td>{task.deadline}</td>
                      <td>{task.reward}</td>
                      <td>
                        <span className={`badge ${task.status === "pending" ? "badge-warning" : task.status === "approved" ? "badge-success" : "badge-error"}`}>
                          {task.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleTaskAction(task.id, "approved")}
                          className="btn btn-xs btn-success font-mono"
                          disabled={task.status !== "pending"}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleTaskAction(task.id, "rejected")}
                          className="btn btn-xs btn-error font-mono"
                          disabled={task.status !== "pending"}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
