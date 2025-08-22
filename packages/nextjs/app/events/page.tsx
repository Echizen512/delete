"use client"

import { useState } from "react"
import CreateEventModal from "./CreateEventModal"

export default function EventsPage() {
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const events = [
        {
            id: 1,
            title: "DeFi Summit 2024",
            description: "Annual conference bringing together DeFi innovators and thought leaders",
            dao: "DeFi Protocol DAO",
            date: "2024-03-15",
            time: "09:00 AM",
            location: "Virtual Event",
            attendees: 1250,
            maxAttendees: 2000,
            type: "Conference",
            status: "Upcoming",
        },
        {
            id: 2,
            title: "NFT Art Gallery Opening",
            description: "Showcase of digital art from community creators",
            dao: "NFT Creators Collective",
            date: "2024-02-28",
            time: "07:00 PM",
            location: "New York, NY",
            attendees: 89,
            maxAttendees: 150,
            type: "Exhibition",
            status: "Upcoming",
        },
        {
            id: 3,
            title: "Green Tech Hackathon",
            description: "48-hour hackathon focused on sustainable technology solutions",
            dao: "Green Energy DAO",
            date: "2024-03-22",
            time: "10:00 AM",
            location: "San Francisco, CA",
            attendees: 340,
            maxAttendees: 500,
            type: "Hackathon",
            status: "Upcoming",
        },
        {
            id: 4,
            title: "Gaming Tournament Finals",
            description: "Championship finals for the monthly gaming tournament",
            dao: "Gaming Guild DAO",
            date: "2024-02-25",
            time: "03:00 PM",
            location: "Virtual Event",
            attendees: 2100,
            maxAttendees: 5000,
            type: "Tournament",
            status: "Live",
        },
    ]

    const eventTypes = ["all", "Conference", "Exhibition", "Hackathon", "Tournament", "Workshop"]

    const filteredEvents = events.filter((event) => {
        return selectedFilter === "all" || event.type === selectedFilter
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Upcoming":
                return "badge badge-primary"
            case "Live":
                return "badge badge-success"
            case "Ended":
                return "badge badge-neutral"
            default:
                return "badge"
        }
    }

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "Conference":
                return "badge badge-secondary"
            case "Exhibition":
                return "badge badge-accent"
            case "Hackathon":
                return "badge badge-warning"
            case "Tournament":
                return "badge badge-error"
            case "Workshop":
                return "badge badge-success"
            default:
                return "badge"
        }
    }

    return (
        <div className="min-h-screen bg-base-200 pt-8">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 font-mono">Community Events</h1>
                        <p className="text-lg font-mono text-base-content/70">Discover and join DAO community events</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-4 md:mt-0 font-mono">
                        ➕ Create Event
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {eventTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedFilter(type)}
                            className={`btn btn-sm font-mono ${selectedFilter === type ? "btn-primary" : "btn-outline"}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-all">
                            <div className="card-body">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={getTypeBadge(event.type)}>{event.type}</span>
                                    <span className={getStatusBadge(event.status)}>{event.status}</span>
                                </div>
                                <h2 className="card-title font-mono">{event.title}</h2>
                                <p className="text-sm text-base-content/70 font-mono">{event.description}</p>
                                <div className="text-sm text-info font-bold font-mono mt-1">by {event.dao}</div>

                                <div className="mt-4 space-y-2 text-sm font-mono text-base-content/60">
                                    <div>📅 {event.date} at {event.time}</div>
                                    <div>📍 {event.location}</div>
                                    <div>👥 {event.attendees} / {event.maxAttendees} attendees</div>
                                </div>

                                <div className="card-actions mt-4 justify-between">
                                    <button className="btn btn-primary btn-sm font-mono w-full">
                                        {event.status === "Live" ? "Join Now" : "Register"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-base-content/60 text-lg font-mono">🚫 No events found for the selected filter</p>
                    </div>
                )}
            </div>

            {isModalOpen && <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}
