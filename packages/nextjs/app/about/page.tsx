"use client"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-base-200 py-16 px-6">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center">
                    <h1 className="text-6xl font-bold font-mono text-primary mb-6">
                        Welcome to DaoForge
                    </h1>
                    <p className="text-lg text-base-content/70 font-mono max-w-3xl mx-auto">
                        A modular platform for launching, managing, and scaling DAOs with clarity, transparency, and real governance.
                    </p>
                </div>

                <div className="space-y-12 font-mono">
                    {/* Overview */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold text-accent">🔍 Overview</h2>
                            <p>
                                DaoForge streamlines the core operations of decentralized autonomous organizations. Whether you're starting a new DAO or contributing to an existing one, DaoForge provides the infrastructure to coordinate tasks, manage funds, and govern effectively.
                            </p>
                        </div>
                    </div>

                    {/* Core Modules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-secondary">🏁 Start</h2>
                                <p>Select an existing DAO or create a new one. Setup is fast, intuitive, and role-based from the start.</p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-info">📋 Tasks</h2>
                                <p>
                                    Admins create tasks. Members can accept them to earn rewards. Once completed, contributors submit proof (e.g. repo link), and Auditors validate the work. Upon approval, payments are released automatically.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-warning">🗳️ Governance</h2>
                                <p>
                                    Immutable voting mechanisms allow DAOs to make transparent, on-chain decisions. Every proposal follows a clear lifecycle: creation, discussion, voting, and execution.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-success">💰 Treasury</h2>
                                <p>
                                    Monitor and manage DAO funds with precision. View balances, track transactions, and configure automated payouts tied to tasks or governance outcomes.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-primary">📅 Events</h2>
                                <p>
                                    Organize and promote DAO events—from community calls to hackathons. Track participation and link events to contributor rewards.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-error">🛠️ Admin Panel</h2>
                                <p>
                                    Admins have access to task creation, member management, treasury controls, and governance tools—all in one unified dashboard.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-accent">🔍 Auditor Panel</h2>
                                <p>
                                    Auditors review submitted tasks, validate deliverables, and approve or reject contributions. Their role ensures quality and fair compensation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold text-info">🧪 Technologies Used</h2>
                            <p>
                                DaoForge is built on a robust, multi-chain architecture designed for speed, flexibility, and security:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2">
                                <li>⚙️ <span className="font-bold">Scaffold ETH 2</span> — rapid dApp development framework</li>
                                <li>⚡ <span className="font-bold">Solana</span> — fast execution for contributor tasks</li>
                                <li>🔄 <span className="font-bold">Circle</span> — stablecoin payments and treasury operations</li>
                                <li>🔗 <span className="font-bold">Other integrations</span> — modular support for future protocols</li>
                            </ul>
                        </div>
                    </div>

                    {/* Future Plans */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold text-success">🚀 Roadmap</h2>
                            <p>
                                DaoForge is evolving. Upcoming features include:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2">
                                <li>⚖️ Integration with <span className="font-bold">Kleros</span> for decentralized dispute resolution</li>
                                <li>📊 Addition of <span className="font-bold">DeFi modules</span> for treasury yield strategies</li>
                                <li>🧠 Deployment of <span className="font-bold">AI tools</span> for task matching and contributor insights</li>
                            </ul>
                            <p className="mt-4">
                                Our roadmap is shaped by real DAO needs. DaoForge grows with its community.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="card bg-base-100 shadow-lg border border-info">
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-primary">🌐 Join the Movement</h2>
                            <p className="text-base-content/70 mt-2">
                                DaoForge is more than a platform—it’s a commitment to decentralized collaboration done right.
                            </p>
                            <p className="mt-2">
                                Whether you're launching your first DAO or scaling a global network, DaoForge is your foundation.
                            </p>
                            <button className="btn btn-primary btn-wide mt-6">Launch Your DAO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}