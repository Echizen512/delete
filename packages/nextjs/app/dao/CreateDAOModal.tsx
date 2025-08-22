import { useState } from "react";
import { X } from "lucide-react";

const CreateDAOModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-primary text-white rounded-3xl p-8 w-full max-w-lg shadow-xl border-2 border-cyan-400 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold font-mono mb-6">Create New DAO</h2>

                <form className="space-y-4 font-mono">
                    <input
                        type="text"
                        placeholder="DAO Name"
                        className="w-full bg-secondary border-2 border-gray-600 px-4 py-3 rounded-xl placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full bg-secondary border-2 border-gray-600 px-4 py-3 rounded-xl placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                        rows={3}
                    />
                    <select
                        className="w-full bg-secondary border-2 border-gray-600 px-4 py-3 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
                    >
                        {["DeFi", "NFT", "Gaming", "Environment", "Social"].map((cat) => (
                            <option key={cat} value={cat} className="bg-primary text-white">
                                {cat}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Initial Treasury (e.g. $1M)"
                        className="w-full bg-secondary border-2 border-gray-600 px-4 py-3 rounded-xl placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                </form>

                <button
                    className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl border-2 border-cyan-400 transition-colors"
                >
                    Launch DAO 🚀
                </button>
            </div>
        </div>
    );
};

export default CreateDAOModal;
