"use client"
import { useState } from "react"

const CreateProposalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dao, setDao] = useState("")
  const [author, setAuthor] = useState("")
  const [quorum, setQuorum] = useState("")
  const [timeLeft, setTimeLeft] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    const newProposal = { title, description, dao, author, quorum, timeLeft }
    console.log("Proposal created:", newProposal)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 text-base-content w-full max-w-xl rounded-box shadow-xl p-8">
        <form className="space-y-4 font-mono">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Create New Proposal</h2>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">✖</button>
          </div>

          <div className="form-control">
            <label className="label font-mono">Proposal Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
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
            <label className="label font-mono">Time Left (days)</label>
            <input
              type="number"
              min={1}
              step={1}
              value={timeLeft}
              onChange={(e) => setTimeLeft(e.target.value)}
              placeholder="e.g. 7"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary w-full font-bold font-mono"
          >
            Submit Proposal 🗳️
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProposalModal
