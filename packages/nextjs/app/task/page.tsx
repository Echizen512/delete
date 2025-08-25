"use client";

import { useState } from "react";
import ConfirmTaskModal from "./ConfirmTaskModal";
import CreateTaskModal from "./CreateTaskModal";
import { Clock, DollarSign, Plus, Search, User } from "lucide-react";

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  ];

  const statuses = ["all", "Open", "In Progress", "Completed", "Cancelled"];
  type Task = {
    id: number;
    title: string;
    description: string;
    dao: string;
    reward: string;
    deadline: string;
    status: string;
    difficulty: string;
    applicants: number;
  };
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const activeTasks = tasks.filter(t => t.status === "In Progress");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.dao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "badge badge-success";
      case "Intermediate":
        return "badge badge-warning";
      case "Advanced":
        return "badge badge-error";
      case "Expert":
        return "badge badge-secondary";
      default:
        return "badge";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return "badge badge-success";
      case "In Progress":
        return "badge badge-primary";
      case "Completed":
        return "badge badge-accent";
      case "Cancelled":
        return "badge badge-error";
      default:
        return "badge";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Active Tasks Table */}
        {activeTasks.length > 0 && (
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 font-mono">YOUR ACTIVE TASKS</h1>
            <p className="text-base-content/70 text-lg font-mono">In-progress tasks</p>
            <div className="overflow-x-auto rounded-box shadow">
              <table className="table table-sm font-mono">
                <thead>
                  <tr className="bg-base-300 text-base-content/70">
                    <th>Title</th>
                    <th>DAO</th>
                    <th>Deadline</th>
                    <th>Reward</th>
                    <th>Applicants</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.map(task => (
                    <tr key={task.id}>
                      <td className="font-bold">{task.title}</td>
                      <td className="text-success">{task.dao}</td>
                      <td>{task.deadline}</td>
                      <td>{task.reward}</td>
                      <td>{task.applicants}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-mono">AVAILABLE TASKS</h1>
            <p className="text-base-content/70 text-lg font-mono">Find tasks that match your skills and earn rewards</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-4 md:mt-0">
            ➕ POST TASK
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className="flex gap-2 flex-wrap">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`btn btn-sm ${selectedStatus === status ? "btn-primary" : "btn-outline"}`}
              >
                {status.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTasks.map(task => (
            <div key={task.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between mb-2">
                  <span className={getStatusBadge(task.status)}>{task.status}</span>
                  <span className={getDifficultyBadge(task.difficulty)}>{task.difficulty}</span>
                </div>
                <h2 className="card-title">{task.title}</h2>
                <p className="text-sm text-base-content/70">{task.description}</p>
                <div className="text-sm text-info font-bold mt-2">BY {task.dao.toUpperCase()}</div>

                <div className="flex justify-between text-sm mt-4">
                  <span>💰 {task.reward}</span>
                  <span>⏰ {task.deadline}</span>
                </div>

                <div className="mt-2 text-sm">👤 {task.applicants} applicants</div>

                <div className="card-actions mt-4">
                  <button onClick={() => setSelectedTask(task)} className="btn btn-primary btn-sm w-full">
                    APPLY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60 text-lg font-mono">🚫 No tasks found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {selectedTask && (
        <ConfirmTaskModal
          task={selectedTask}
          activeTasks={activeTasks}
          onConfirm={() => {
            console.log("Accepted task:", selectedTask.title);
            setSelectedTask(null);
          }}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
