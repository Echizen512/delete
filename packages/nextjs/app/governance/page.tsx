"use client";

import { useState } from "react";
import CreateProposalModal from "./CreateProposalModal";

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "badge badge-success";
      case "Passed":
        return "badge badge-info";
      case "Failed":
        return "badge badge-error";
      case "Pending":
        return "badge badge-warning";
      default:
        return "badge";
    }
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  const getQuorumPercentage = (total: number, quorum: number) => {
    return (total / quorum) * 100;
  };

  return (
    <div className="min-h-screen bg-base-200 pt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-mono">Governance</h1>
            <p className="text-lg font-mono text-base-content/70">Participate in DAO decision making</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-4 md:mt-0 font-mono">
            ➕ Create Proposal
          </button>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {proposals.map(proposal => (
            <div key={proposal.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <span className={getStatusBadge(proposal.status)}>{proposal.status}</span>
                  <span className="text-sm font-mono text-base-content/60">by {proposal.author}</span>
                </div>
                <h2 className="card-title font-mono">{proposal.title}</h2>
                <p className="text-sm text-base-content/70 font-mono">{proposal.description}</p>
                <div className="text-sm text-info font-bold font-mono mt-1">{proposal.dao}</div>

                {/* Voting Progress */}
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-mono mb-1">
                      <span className="text-success">👍 For: {proposal.votesFor}</span>
                      <span className="text-error">👎 Against: {proposal.votesAgainst}</span>
                    </div>
                    <div className="flex gap-1 h-3 bg-neutral rounded-full overflow-hidden">
                      <div
                        className="bg-success h-full"
                        style={{ width: `${getVotePercentage(proposal.votesFor, proposal.totalVotes)}%` }}
                      />
                      <div
                        className="bg-error h-full"
                        style={{ width: `${getVotePercentage(proposal.votesAgainst, proposal.totalVotes)}%` }}
                      />
                    </div>
                  </div>

                  {/* Quorum Progress */}
                  <div>
                    <div className="flex justify-between text-sm font-mono mb-1 text-base-content/70">
                      <span>👥 Quorum Progress</span>
                      <span>
                        {proposal.totalVotes} / {proposal.quorum}
                      </span>
                    </div>
                    <div className="w-full bg-neutral rounded-full h-3">
                      <div
                        className="bg-secondary/30 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(getQuorumPercentage(proposal.totalVotes, proposal.quorum), 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-base-content/60 font-mono">⏰ {proposal.timeLeft}</div>
                  {proposal.status === "Active" && (
                    <div className="flex gap-2">
                      <button className="btn btn-success btn-sm font-mono">👍 Vote For</button>
                      <button className="btn btn-error btn-sm font-mono">👎 Vote Against</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <CreateProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
