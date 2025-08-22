"use client"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-base-200 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-mono mb-4">Welcome to DaoForge</h1>
                    <p className="text-lg text-base-content/70 font-mono">
                        The ultimate toolkit for building, governing, and scaling decentralized autonomous organizations.
                    </p>
                </div>

                <div className="space-y-10 font-mono">
                    {/* What is DaoForge */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">🔧 What is DaoForge?</h2>
                            <p>
                                DaoForge is a macro-tool designed to unify the core pillars of DAO infrastructure into one seamless experience. It’s not just a dashboard—it’s a launchpad for decentralized coordination. Whether you're a grassroots collective or a protocol-level DAO, DaoForge gives you the tools to:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>💰 Manage treasury funds with transparency</li>
                                <li>🧑‍💼 Post and fulfill tasks, bounties, and jobs</li>
                                <li>🗳️ Propose and vote on governance decisions</li>
                                <li>📈 Stake assets to grow your treasury</li>
                                <li>📅 Host and promote community events</li>
                            </ul>
                        </div>
                    </div>

                    {/* Justification */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">📚 Why DaoForge?</h2>
                            <p>
                                DAOs today face fragmentation. Treasury tools live in one place, governance in another, and contributor workflows are often disconnected. This leads to inefficiency, confusion, and missed opportunities for engagement.
                            </p>
                            <p className="mt-2">
                                DaoForge solves this by offering a unified interface that’s modular, scalable, and intuitive. It’s built for contributors, governors, and builders alike—bridging the gap between vision and execution.
                            </p>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">🎯 Mission & Vision</h2>
                            <p>
                                Our mission is to empower decentralized communities with infrastructure that rivals traditional organizations—without sacrificing autonomy or transparency.
                            </p>
                            <p className="mt-2">
                                Our vision is a world where DAOs are the default structure for collaboration, funding, and innovation. DaoForge is the bridge to that future.
                            </p>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">🧪 Built With</h2>
                            <p>
                                DaoForge is built on Scaffold ETH 2, a powerful framework for rapid dApp development. Our stack includes:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>🔄 <span className="font-bold">Circle</span> — for stablecoin payments and treasury operations</li>
                                <li>⚡ <span className="font-bold">Solana</span> — for fast, low-cost execution of contributor tasks</li>
                                <li>🌀 <span className="font-bold">Arbitrum</span> — for scalable Layer 2 governance and voting</li>
                                <li>🌐 <span className="font-bold">Worldcoin</span> — for identity verification and proof-of-personhood</li>
                                <li>🛠️ <span className="font-bold">RainbowKit & Wagmi</span> — for wallet integration and UX excellence</li>
                            </ul>
                            <p className="mt-4">
                                This multi-chain, multi-tool architecture ensures flexibility, speed, and security across all DAO operations.
                            </p>
                        </div>
                    </div>

                    {/* Roadmap */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">🚀 Roadmap & Future Plans</h2>
                            <p>
                                DaoForge is just getting started. Here’s what’s coming next:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>🧠 AI-powered proposal drafting and DAO analytics</li>
                                <li>📲 Mobile-first contributor experience</li>
                                <li>🌍 Multi-chain DAO deployment (Polygon, Base, Optimism)</li>
                                <li>🔐 ZK-based voting and privacy-preserving governance</li>
                                <li>🧩 Plugin system for custom modules and DAO extensions</li>
                                <li>📡 Real-time notifications and contributor reputation scoring</li>
                            </ul>
                            <p className="mt-4">
                                Our roadmap is shaped by the needs of the community. DaoForge evolves with you.
                            </p>
                        </div>
                    </div>

                    {/* Closing Statement */}
                    <div className="card bg-base-100 shadow-md border border-info">
                        <div className="card-body text-center">
                            <h2 className="text-xl font-bold">🌐 Join the Movement</h2>
                            <p className="text-base-content/70 mt-2">
                                DaoForge isn’t just a platform—it’s a philosophy. A belief that decentralized collaboration can be powerful, elegant, and scalable.
                            </p>
                            <p className="mt-2">
                                Whether you're launching your first DAO or scaling a global network, DaoForge is your foundation.
                            </p>
                            <button className="btn btn-primary mt-4">Launch Your DAO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
