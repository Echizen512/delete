"use client"
import { useState } from "react"

type Auditor = {
  id: number
  name: string
  status: "active" | "blocked"
  complaints: string[]
}

type Task = {
  id: number
  title: string
  dao: string
  deadline: string
  reward: string
  status: "pending" | "approved" | "rejected"
}

type Member = {
  id: number
  name: string
  role: string
  status: "Active" | "Pending"
}

export default function AdminDashboard() {
  const [newAuditor, setNewAuditor] = useState("")
  const [auditors, setAuditors] = useState<Auditor[]>([
    { id: 1, name: "0x1234...abcd", status: "active", complaints: [] },
    { id: 2, name: "0x5678...efgh", status: "blocked", complaints: ["Spam reports", "Inaccurate reviews"] },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Audit Treasury Contract", dao: "DeFi Protocol DAO", deadline: "2024-09-01", reward: "400 USDC", status: "pending" },
    { id: 2, title: "Review Governance Proposal", dao: "Green Energy DAO", deadline: "2024-09-05", reward: "250 USDC", status: "pending" },
  ])

  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Alice", role: "Member", status: "Active" },
    { id: 2, name: "Bob", role: "Auditor", status: "Pending" },
    { id: 3, name: "Charlie", role: "Member", status: "Active" },
  ])

  const handleAddAuditor = () => {
    if (newAuditor.trim()) {
      setAuditors([...auditors, { id: Date.now(), name: newAuditor, status: "active", complaints: [] }])
      setNewAuditor("")
    }
  }

  const toggleBlock = (id: number) => {
    setAuditors(auditors.map(a => a.id === id ? { ...a, status: a.status === "active" ? "blocked" : "active" } : a))
  }

  const handleTaskAction = (id: number, action: "approved" | "rejected") => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: action } : t))
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold font-mono">Admin Panel</h1>

        {/* Add Auditor */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body space-y-4">
            <h2 className="card-title font-mono">➕ Add Auditor</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={newAuditor}
                onChange={(e) => setNewAuditor(e.target.value)}
                placeholder="Enter wallet address"
                className="input input-bordered w-full font-mono"
              />
              <button onClick={handleAddAuditor} className="btn btn-primary font-mono">Add</button>
            </div>
          </div>
        </div>

        {/* Auditor Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title font-mono">👥 Auditor List</h2>
            <div className="overflow-x-auto mt-4">
              <table className="table table-sm font-mono">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Complaints</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {auditors.map(a => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>
                        <span className={`badge ${a.status === "active" ? "badge-success" : "badge-error"}`}>
                          {a.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{a.complaints.length > 0 ? a.complaints.join(", ") : "—"}</td>
                      <td>
                        <button onClick={() => toggleBlock(a.id)} className="btn btn-xs btn-outline font-mono">
                          {a.status === "active" ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DAO Members Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title font-mono">👥 DAO Members</h2>
            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra font-mono">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td><span className="badge badge-secondary">{member.role}</span></td>
                      <td>
                        <span className={`badge ${member.status === "Active" ? "badge-success" : "badge-warning"}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="flex gap-2">
                        <button className="btn btn-sm btn-outline btn-success font-mono">Approve</button>
                        <button className="btn btn-sm btn-outline btn-error font-mono">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Active Tasks Table */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title font-mono">📝 In-Progress Tasks</h2>
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
                  {tasks.map(t => (
                    <tr key={t.id}>
                      <td>{t.title}</td>
                      <td className="text-info">{t.dao}</td>
                      <td>{t.deadline}</td>
                      <td>{t.reward}</td>
                      <td>
                        <span className={`badge ${t.status === "pending" ? "badge-warning" : t.status === "approved" ? "badge-success" : "badge-error"}`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="flex gap-2">
                        <button onClick={() => handleTaskAction(t.id, "approved")} className="btn btn-xs btn-success font-mono">Approve</button>
                        <button onClick={() => handleTaskAction(t.id, "rejected")} className="btn btn-xs btn-error font-mono">Reject</button>
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
