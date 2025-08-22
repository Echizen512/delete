"use client"
import { useState } from "react"

const CreateTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dao, setDao] = useState("")
  const [reward, setReward] = useState("")
  const [deadline, setDeadline] = useState("")
  const [difficulty, setDifficulty] = useState("Intermediate")
  const [status, setStatus] = useState("Open")

  if (!isOpen) return null

  const handleSubmit = () => {
    const newTask = { title, description, dao, reward, deadline, difficulty, status }
    console.log("Task created:", newTask)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 text-base-content w-full max-w-xl rounded-box shadow-xl p-8">
        <form className="space-y-4 font-mono">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Post New Task</h3>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">✖</button>
          </div>

          <div className="form-control">
            <label className="label font-mono">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="textarea textarea-bordered w-full resize-none"
              rows={3}
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">DAO Name</label>
            <input
              type="text"
              value={dao}
              onChange={(e) => setDao(e.target.value)}
              placeholder="e.g. DeFi Guild"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Reward</label>
            <input
              type="text"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="e.g. 500 USDC"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="select select-bordered w-full"
            >
              {["Beginner", "Intermediate", "Advanced", "Expert"].map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label font-mono">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              {["Open", "In Progress", "Completed", "Cancelled"].map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary w-full font-bold font-mono"
          >
            Submit Task 🚀
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTaskModal
