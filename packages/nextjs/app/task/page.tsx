"use client"

import { useState } from "react"
import { Search, Clock, DollarSign, User, Plus } from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")

    const tasks = [
        {
            id: 1,
            title: "Smart Contract Audit",
            description: "Review and audit DeFi protocol smart contracts for security vulnerabilities",
            dao: "DeFi Protocol DAO",
            reward: "500 USDC",
            deadline: "2024-02-15",
            status: "Open",
            difficulty: "Expert",
            applicants: 3,
        },
        {
            id: 2,
            title: "Community Management",
            description: "Manage Discord community and engage with members daily",
            dao: "NFT Creators Collective",
            reward: "300 USDC",
            deadline: "2024-02-20",
            status: "Open",
            difficulty: "Intermediate",
            applicants: 8,
        },
        {
            id: 3,
            title: "Marketing Campaign Design",
            description: "Create comprehensive marketing strategy for new token launch",
            dao: "Green Energy DAO",
            reward: "750 USDC",
            deadline: "2024-02-10",
            status: "In Progress",
            difficulty: "Advanced",
            applicants: 12,
        },
        {
            id: 4,
            title: "Frontend Development",
            description: "Build responsive web interface for DAO governance platform",
            dao: "Gaming Guild DAO",
            reward: "1000 USDC",
            deadline: "2024-03-01",
            status: "Open",
            difficulty: "Advanced",
            applicants: 5,
        },
    ]

    const statuses = ["all", "Open", "In Progress", "Completed", "Cancelled"]

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.dao.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
        return matchesSearch && matchesStatus
    })

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-500/20 text-green-400 border-green-400 rounded-full"
            case "Intermediate":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-400 rounded-full"
            case "Advanced":
                return "bg-orange-500/20 text-orange-400 border-orange-400 rounded-full"
            case "Expert":
                return "bg-red-500/20 text-red-400 border-red-400 rounded-full"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-400 rounded-full"
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Open":
                return "bg-green-500/20 text-green-400 border-green-400 rounded-full"
            case "In Progress":
                return "bg-blue-500/20 text-blue-400 border-blue-400 rounded-full"
            case "Completed":
                return "bg-purple-500/20 text-purple-400 border-purple-400 rounded-full"
            case "Cancelled":
                return "bg-red-500/20 text-red-400 border-red-400 rounded-full"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-400 rounded-full"
        }
    }

    return (
        <div className="min-h-screen bg-primary pt-8">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 font-mono">AVAILABLE TASKS</h1>
                        <p className="text-gray-400 text-lg font-mono">Find tasks that match your skills and earn rewards</p>
                    </div>
                    <Link href="/tasks/create">
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 font-mono font-bold transition-colors border-2 border-cyan-400 mt-4 md:mt-0 flex items-center rounded-4xl">
                            <Plus className="mr-2 h-4 w-4" />
                            POST TASK
                        </button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 bg-secondary/50 rounded-4xl placeholder-gray-400 px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 font-mono font-bold rounded-4xl transition-colors border-1 ${selectedStatus === status
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                                        : "border-gray-600 text-gray-500 hover:bg-gray-700"
                                    }`}
                            >
                                {status.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tasks Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-secondary/40 rounded-4xl transition-all duration-300 p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 text-sm font-mono font-bold border ${getStatusColor(task.status)}`}>
                                    {task.status.toUpperCase()}
                                </span>
                                <span className={`px-3 py-1 text-sm font-mono font-bold border ${getDifficultyColor(task.difficulty)}`}>
                                    {task.difficulty.toUpperCase()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 font-mono">{task.title}</h3>
                            <p className="text-gray-500 mb-2 font-mono text-sm">{task.description}</p>
                            <div className="text-sm text-cyan-400 font-mono font-bold mb-4">BY {task.dao.toUpperCase()}</div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center text-gray-500">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    <span className="font-mono font-bold">{task.reward}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span className="text-sm font-mono">{task.deadline}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center text-gray-500">
                                    <User className="h-4 w-4 mr-1" />
                                    <span className="text-sm font-mono">{task.applicants} applicants</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 font-mono font-bold transition-colors border-2 border-cyan-400">
                                    APPLY NOW
                                </button>
                                <button className="border-2 rounded-full border-gray-600 hover:bg-gray-500 px-4 py-2 font-mono font-bold transition-colors">
                                    VIEW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg font-mono">NO TASKS FOUND MATCHING YOUR CRITERIA</p>
                    </div>
                )}
            </div>
        </div>
    )
}
