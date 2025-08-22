"use client"
const ConfirmTaskModal = ({
  task,
  activeTasks,
  onConfirm,
  onClose,
}: {
  task: any
  activeTasks: any[]
  onConfirm: () => void
  onClose: () => void
}) => {
  if (!task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 text-base-content w-full max-w-3xl rounded-box shadow-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-mono">Confirm Task Acceptance</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">✖</button>
        </div>

        {/* Active Tasks Table */}
        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2 text-info">Your Active Tasks</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm font-mono">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>DAO</th>
                  <th>Deadline</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks.length > 0 ? (
                  activeTasks.map((t) => (
                    <tr key={t.id}>
                      <td>{t.title}</td>
                      <td className="text-info">{t.dao}</td>
                      <td>{t.deadline}</td>
                      <td>{t.reward}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-base-content/60">No active tasks</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Confirmation */}
        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2 text-info">Task to Accept</h3>
          <div className="bg-base-200 p-4 rounded-box space-y-2">
            <p className="font-bold text-xl">{task.title}</p>
            <p className="text-sm text-base-content/70">{task.description}</p>
            <div className="grid grid-cols-3 gap-4 text-sm text-base-content/60 mt-2">
              <div>💰 {task.reward}</div>
              <div>⏰ {task.deadline}</div>
              <div>👤 {task.applicants} applicants</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button onClick={onConfirm} className="btn btn-primary flex-1 font-mono">
            Accept Task ✅
          </button>
          <button onClick={onClose} className="btn btn-outline flex-1 font-mono">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmTaskModal
