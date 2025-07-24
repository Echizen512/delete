"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Plus } from "lucide-react"

export default function EventsPage() {
    const [selectedFilter, setSelectedFilter] = useState("all")

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Upcoming":
                return "bg-blue-500/20 text-blue-400 border-blue-500 rounded-full"
            case "Live":
                return "bg-green-400/20 text-green-700 border-green-500 rounded-full"
            case "Ended":
                return "bg-gray-500/20 text-gray-400 border-gray-500 rounded-full"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500 rounded-full"
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Conference":
                return "bg-purple-500/20 text-purple-400 rounded-full"
            case "Exhibition":
                return "bg-pink-500/20 text-pink-400 rounded-full"
            case "Hackathon":
                return "bg-orange-500/20 text-orange-400 rounded-full"
            case "Tournament":
                return "bg-red-500/20 text-red-400 rounded-full"
            case "Workshop":
                return "bg-yellow-500/20 text-yellow-400 rounded-full"
            default:
                return "bg-gray-500/20 text-gray-400 rounded-full"
        }
    }

    return (
        <div className="min-h-screen bg-primary pt-8">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text mb-2 font-mono">
                            Community Events
                        </h1>
                        <p className="text-lg font-mono">Discover and join DAO community events</p>
                    </div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-4xl text-white px-6 py-3 font-mono font-bold transition-colors border-2 border-cyan-400 mt-4 md:mt-0 flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {eventTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedFilter(type)}
                            className={`px-4 py-2 font-mono font-bold transition-colors rounded-4xl border-1 ${selectedFilter === type
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                                    : "border-gray-600 hover:bg-gray-700"
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-secondary/40 rounded-4xl transition-all duration-300 hover:transform hover:scale-105 p-6"
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-3 py-1 text-sm font-mono font-bold ${getTypeColor(event.type)}`}>
                                        {event.type.toUpperCase()}
                                    </span>
                                    <span className={`px-3 py-1 text-sm font-mono font-bold border ${getStatusColor(event.status)}`}>
                                        {event.status.toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-mono">{event.title}</h3>
                                <p className="text-gray-500 mb-2 font-mono text-sm">{event.description}</p>
                                <div className="text-sm text-cyan-400 font-medium font-mono">by {event.dao}</div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span className="text-sm font-mono">
                                        {event.date} at {event.time}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span className="text-sm font-mono">{event.location}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <Users className="h-4 w-4 mr-2" />
                                    <span className="text-sm font-mono">
                                        {event.attendees} / {event.maxAttendees} attendees
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 rounded-4xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-4 font-mono font-bold transition-colors border-2 border-cyan-400">
                                    {event.status === "Live" ? "Join Now" : "Register"}
                                </button>
                                <button className="border-2 rounded-4xl border-gray-600 hover:bg-gray-500 px-4 py-2 font-mono font-bold transition-colors">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg font-mono">No events found for the selected filter</p>
                    </div>
                )}
            </div>
        </div>
    )
}
