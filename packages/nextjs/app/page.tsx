"use client"

import type { NextPage } from "next"
import CreateDAOModal from "./dao/CreateDAOModal"
import JoinDAOModal from "./dao/JoinDAOModal"
import DAODetailModal from "./dao/DAODetailModal"
import { useState } from "react"

type DAO = {
  id: number
  name: string
  description: string
  members: number
  treasury: string
  category: string
  status: string
}

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null)
  const [viewDAO, setViewDAO] = useState<DAO | null>(null)

  const daos: DAO[] = [
    { id: 1, name: "DeFi Protocol DAO", description: "Governing the future of decentralized finance protocols", members: 1250, treasury: "$2.5M", category: "DeFi", status: "Active" },
    { id: 2, name: "NFT Creators Collective", description: "Supporting digital artists and NFT creators worldwide", members: 890, treasury: "$850K", category: "NFT", status: "Active" },
    { id: 3, name: "Green Energy DAO", description: "Funding renewable energy projects through blockchain", members: 2100, treasury: "$5.2M", category: "Environment", status: "Active" },
    { id: 4, name: "Gaming Guild DAO", description: "Play-to-earn gaming community and asset management", members: 3400, treasury: "$1.8M", category: "Gaming", status: "Active" },
  ]

  const categories = ["all", "DeFi", "NFT", "Gaming", "Environment", "Social"]

  const filteredDAOs = daos.filter((dao) => {
    const matchesSearch = dao.name.toLowerCase().includes(searchTerm.toLowerCase()) || dao.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || dao.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-base-200 pt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-mono">DISCOVER DAOs</h1>
            <p className="text-lg font-mono text-base-content/70">Join decentralized organizations that match your interests</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-4 md:mt-0">
            ➕ CREATE DAO
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search DAOs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${selectedCategory === category ? "btn-primary" : "btn-outline"}`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* DAO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDAOs.map((dao) => (
            <div key={dao.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between mb-2">
                  <span className="badge badge-primary">{dao.category}</span>
                  <span className="badge badge-success">{dao.status}</span>
                </div>
                <h2 className="card-title">{dao.name}</h2>
                <p className="text-sm">{dao.description}</p>
                <div className="flex justify-between text-sm mt-4">
                  <span>👥 {dao.members} members</span>
                  <span>💰 {dao.treasury}</span>
                </div>
                <div className="card-actions mt-4 justify-between">
                  <button onClick={() => setSelectedDAO(dao)} className="btn btn-primary btn-sm">JOIN DAO</button>
                  <button onClick={() => setViewDAO(dao)} className="btn btn-outline btn-sm">VIEW</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDAOs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60 text-lg font-mono">🚫 No DAOs found matching your criteria</p>
          </div>
        )}
      </div>
        
      {/* Modals */}
      {isModalOpen && <CreateDAOModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {selectedDAO && (
        <JoinDAOModal
          dao={selectedDAO}
          onConfirm={() => {
            console.log("Joined DAO:", selectedDAO.name)
            setSelectedDAO(null)
          }}
          onClose={() => setSelectedDAO(null)}
        />
      )}
      {viewDAO && <DAODetailModal dao={viewDAO} onClose={() => setViewDAO(null)} />}
    </div>
  )
}

export default Home
