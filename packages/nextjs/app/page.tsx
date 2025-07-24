"use client"

import Link from "next/link"
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useState } from "react"
import { Search, Users, TrendingUp, Plus } from "lucide-react"

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const daos = [
    {
      id: 1,
      name: "DeFi Protocol DAO",
      description: "Governing the future of decentralized finance protocols",
      members: 1250,
      treasury: "$2.5M",
      category: "DeFi",
      status: "Active",
    },
    {
      id: 2,
      name: "NFT Creators Collective",
      description: "Supporting digital artists and NFT creators worldwide",
      members: 890,
      treasury: "$850K",
      category: "NFT",
      status: "Active",
    },
    {
      id: 3,
      name: "Green Energy DAO",
      description: "Funding renewable energy projects through blockchain",
      members: 2100,
      treasury: "$5.2M",
      category: "Environment",
      status: "Active",
    },
    {
      id: 4,
      name: "Gaming Guild DAO",
      description: "Play-to-earn gaming community and asset management",
      members: 3400,
      treasury: "$1.8M",
      category: "Gaming",
      status: "Active",
    },
  ]

  const categories = ["all", "DeFi", "NFT", "Gaming", "Environment", "Social"]

  const filteredDAOs = daos.filter((dao) => {
    const matchesSearch =
      dao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dao.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || dao.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const { address: connectedAddress } = useAccount();

  return (
    <div className="min-h-screen bg-primary pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-mono">DISCOVER DAOs</h1>
            <p className="text-lg font-mono text-gray-5003330
            
            
            ">
              Join decentralized organizations that match your interests
            </p>
          </div>
          <Link href="/daos/create">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 font-mono font-bold transition-colors border-2 border-cyan-400 mt-4 md:mt-0 flex items-center rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              CREATE DAO
            </button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 rounded-3xl" />
            <input
              type="text"
              placeholder="Search DAOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-secondary border-2 placeholder-gray-400 px-4 py-3 font-mono focus:border-cyan-400 focus:outline-none rounded-3xl"
            />
            </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl font-mono font-bold transition-colors border-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-500"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* DAO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDAOs.map((dao) => (
            <div
              key={dao.id}
              className="bg-secondary/40 transition-all duration-300 hover:transform hover:scale-105 p-6 rounded-4xl"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 text-sm font-mono font-bold border border-cyan-400 rounded-full">
                  {dao.category.toUpperCase()}
                </span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 text-sm font-mono font-bold border border-green-400 rounded-full">
                  {dao.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 font-mono">{dao.name}</h3>
              <p className="mb-4 font-mono text-sm">{dao.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm font-mono">{dao.members} members</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-mono">{dao.treasury}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-mono font-bold transition-colors border-2 border-cyan-400 rounded-xl">
                  JOIN DAO
                </button>
                <button className="border-2 border-gray-600 hover:bg-gray-500 px-4 py-2 font-mono font-bold transition-colors rounded-xl">
                  VIEW
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDAOs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg font-mono">NO DAOs FOUND MATCHING YOUR CRITERIA</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;