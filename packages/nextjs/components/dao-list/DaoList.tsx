import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DAODetailModal from "../../app/dao/DAODetailModal";
import JoinDAOModal from "../../app/dao/JoinDAOModal";
import { FaucetButton } from "../scaffold-eth/FaucetButton";
import { RainbowKitCustomConnectButton } from "../scaffold-eth/RainbowKitCustomConnectButton";
import CreateDAOModal from "./_components/CreateDAOModal";
import { DaoPreviewCard } from "./_components/DaoPreviewCard";
import { Plus } from "lucide-react";
import { hardhat } from "viem/chains";
import { ButtonAnimateText } from "~~/components/ButtonAnimateText";
import { DAO_CATEGORIES } from "~~/constants/daoCategories";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

type DAO = {
  id: number;
  name: string;
  description: string;
  members: number;
  treasury: string;
  category: string;
  status: string;
};

export const DaoList: React.FC = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);
  const [viewDAO, setViewDAO] = useState<DAO | null>(null);

  //smart contracts
  const { data: daos } = useScaffoldReadContract({
    contractName: "DaoForgeFabric",
    functionName: "showDaos",
  });

  // const daos: DAO[] = [
  //   {
  //     id: 1,
  //     name: "DeFi Protocol DAO",
  //     description: "Governing the future of decentralized finance protocols",
  //     members: 1250,
  //     treasury: "$2.5M",
  //     category: "DeFi",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "NFT Creators Collective",
  //     description: "Supporting digital artists and NFT creators worldwide",
  //     members: 890,
  //     treasury: "$850K",
  //     category: "NFT",
  //     status: "Active",
  //   },
  //   {
  //     id: 3,
  //     name: "Green Energy DAO",
  //     description: "Funding renewable energy projects through blockchain",
  //     members: 2100,
  //     treasury: "$5.2M",
  //     category: "Environment",
  //     status: "Active",
  //   },
  //   {
  //     id: 4,
  //     name: "Gaming Guild DAO",
  //     description: "Play-to-earn gaming community and asset management",
  //     members: 3400,
  //     treasury: "$1.8M",
  //     category: "Gaming",
  //     status: "Active",
  //   },
  // ];

  const filteredDAOs = daos?.filter(dao => {
    const matchesSearch =
      dao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dao.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dao.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-base-200 ">
      {/* Header */}
      <header className="flex justify-between bg-base-100 sticky top-0 px-2 py-3">
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <div className="navbar-end grow mr-4">
          <RainbowKitCustomConnectButton />
          {isLocalNetwork && <FaucetButton />}
        </div>
      </header>

      {/* Modals */}
      <CreateDAOModal />

      <section className="container mx-auto pt-5">
        {/* Button Create DAO */}
        <div className="w-full flex flex-col justify-center items-center my-4">
          <ButtonAnimateText
            icon={<Plus className="w-4 h-4" />}
            texts={["Bring your idea to life", "Turn your vision into a DAO", "Make history: launch your DAO"]}
          />
        </div>

        {/* Search + Filters */}
        <div className="pl-2">
          <h2 className="text-4xl font-bold">DISCOVER DAOs</h2>
          <p className="text-md text-base-content/70 mt-0 mb-0.5">
            Join decentralized organizations that match your interests.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search DAOs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className="flex gap-2 flex-wrap">
            {DAO_CATEGORIES.map(x => (
              <button
                key={x}
                onClick={() => setSelectedCategory(x)}
                className={`btn btn-sm ${selectedCategory === x ? "btn-primary" : "btn-outline"}`}
              >
                {x.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* DAO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDAOs?.map((x, y: number) => (
            <DaoPreviewCard
              key={y}
              name={x.name}
              address={x.daoAddress}
              description={x.description}
              category={x.category}
            />
            // <div key={dao.daoAddress} className="card bg-base-100 shadow-xl">
            //   <div className="card-body">
            //     <div className="flex justify-between mb-2">
            //       <span className="badge badge-primary">{dao.category}</span>
            //       {/* <span className="badge badge-success">{dao.status}</span> */}
            //     </div>
            //     <h2 className="card-title">{dao.name}</h2>
            //     <p className="text-sm">{dao.description}</p>
            //     <div className="flex justify-between text-sm mt-4">
            //       {/* <span>👥 {dao.members} members</span> */}
            //       {/* <span>💰 {dao.treasury}</span> */}
            //     </div>
            //     <div className="card-actions mt-4 justify-between">
            //       {/* <button onClick={() => setSelectedDAO(dao)} className="btn btn-primary btn-sm">
            //         JOIN DAO
            //       </button> */}
            //       {/* <button onClick={() => setViewDAO(dao)} className="btn btn-outline btn-sm">
            //         VIEW
            //       </button> */}
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDAOs === undefined ||
          (filteredDAOs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-base-content/60 text-lg font-mono">🚫 No DAOs found matching your criteria</p>
            </div>
          ))}
      </section>

      {selectedDAO && (
        <JoinDAOModal
          dao={selectedDAO}
          onConfirm={() => {
            console.log("Joined DAO:", selectedDAO.name);
            setSelectedDAO(null);
          }}
          onClose={() => setSelectedDAO(null)}
        />
      )}
      {viewDAO && <DAODetailModal dao={viewDAO} onClose={() => setViewDAO(null)} />}
    </main>
  );
};
