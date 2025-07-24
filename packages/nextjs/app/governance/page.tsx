"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, MessageSquare, Clock, Users, Plus } from "lucide-react"

export default function GovernancePage() {
    const [selectedProposal, setSelectedProposal] = useState<number | null>(null)

    const proposals = [
        {
            id: 1,
            title: "Increase Treasury Allocation for Marketing",
            description: "Proposal to allocate 15% of treasury funds for marketing initiatives to grow community",
            dao: "DeFi Protocol DAO",
            status: "Active",
            votesFor: 1250,
            votesAgainst: 340,
            totalVotes: 1590,
            quorum: 2000,
            timeLeft: "3 days",
            author: "0x1234...5678",
        },
        {
            id: 2,
            title: "Implement New Staking Rewards Program",
            description: "Introduce tiered staking rewards to incentivize long-term token holding",
            dao: "Gaming Guild DAO",
            status: "Active",
            votesFor: 890,
            votesAgainst: 120,
            totalVotes: 1010,
            quorum: 1500,
            timeLeft: "5 days",
            author: "0xabcd...efgh",
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500/20 text-green-400 border-green-500"
            case "Passed":
                return "bg-blue-500/20 text-blue-400 border-blue-500"
            case "Failed":
                return "bg-red-500/20 text-red-400 border-red-500"
            case "Pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500"
        }
    }

    const getVotePercentage = (votes: number, total: number) => {
        return total > 0 ? (votes / total) * 100 : 0
    }

    const getQuorumPercentage = (total: number, quorum: number) => {
        return (total / quorum) * 100
    }

    return (
        <div className="min-h-screen bg-primary pt-8">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text mb-2 font-mono">
                            Governance
                        </h1>
                        <p className="text-lg font-mono">Participate in DAO decision making</p>
                    </div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-4xl px-6 py-3 font-mono font-bold transition-colors border-2 border-cyan-400 mt-4 md:mt-0 flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Proposal
                    </button>
                </div>

                {/* Proposals List */}
                <div className="space-y-6">
                    {proposals.map((proposal) => (
                        <div
                            key={proposal.id}
                            className="bg-secondary/40 rounded-4xl hover:border-cyan-500/50 transition-all duration-300 p-6"
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-3 py-1 text-sm font-mono font-bold rounded-full border ${getStatusColor(proposal.status)}`}>
                                        {proposal.status.toUpperCase()}
                                    </span>
                                    <div className="text-sm font-mono">by {proposal.author}</div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-mono">{proposal.title}</h3>
                                <p className="text-gray-500 mb-2 font-mono">{proposal.description}</p>
                                <div className="text-sm text-cyan-500 font-medium font-mono">{proposal.dao}</div>
                            </div>

                            {/* Voting Progress */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-green-400 flex items-center font-mono">
                                            <ThumbsUp className="h-4 w-4 mr-1" />
                                            For: {proposal.votesFor}
                                        </span>
                                        <span className="text-red-400 flex items-center font-mono">
                                            <ThumbsDown className="h-4 w-4 mr-1" />
                                            Against: {proposal.votesAgainst}
                                        </span>
                                    </div>
                                    <div className="flex gap-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="bg-green-500 h-full"
                                            style={{ width: `${getVotePercentage(proposal.votesFor, proposal.totalVotes)}%` }}
                                        />
                                        <div
                                            className="bg-red-500 h-full"
                                            style={{ width: `${getVotePercentage(proposal.votesAgainst, proposal.totalVotes)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Quorum Progress */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300 flex items-center font-mono">
                                            <Users className="h-4 w-4 mr-1" />
                                            Quorum Progress
                                        </span>
                                        <span className="text-gray-300 font-mono">
                                            {proposal.totalVotes} / {proposal.quorum}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className="bg-cyan-500 h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${Math.min(getQuorumPercentage(proposal.totalVotes, proposal.quorum), 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-400">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span className="text-sm font-mono">{proposal.timeLeft}</span>
                                </div>
                                <div className="flex gap-2">
                                    {proposal.status === "Active" && (
                                        <>
                                            <button className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 font-mono font-bold transition-colors border-2 border-green-500 flex items-center">
                                                <ThumbsUp className="h-4 w-4 mr-1" />
                                                Vote For
                                            </button>
                                            <button className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-2 font-mono font-bold transition-colors border-2 border-red-500 flex items-center">
                                                <ThumbsDown className="h-4 w-4 mr-1" />
                                                Vote Against
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
