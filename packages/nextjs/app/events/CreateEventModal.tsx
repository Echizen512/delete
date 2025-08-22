"use client"
import { useState } from "react"

const CreateEventModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dao, setDao] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("Conference")
  const [maxAttendees, setMaxAttendees] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    const newEvent = { title, description, dao, date, time, location, type, maxAttendees }
    console.log("Event created:", newEvent)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 text-base-content w-full max-w-xl rounded-box shadow-xl p-8">
        <form className="space-y-4 font-mono">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Create New Event</h2>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">✖</button>
          </div>

          <div className="form-control">
            <label className="label font-mono">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
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
            <label className="label font-mono">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Virtual Event"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-mono">Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full"
            >
              {["Conference", "Exhibition", "Hackathon", "Tournament", "Workshop"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary w-full font-bold font-mono"
          >
            Submit Event 📅
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEventModal
