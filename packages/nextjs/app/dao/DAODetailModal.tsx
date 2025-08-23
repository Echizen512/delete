"use client";

const DAODetailModal = ({ dao, onClose }: { dao: any; onClose: () => void }) => {
  if (!dao) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 text-base-content w-full max-w-xl rounded-box shadow-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold font-mono">{dao.name}</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">
            ✖
          </button>
        </div>

        <p className="text-sm font-mono mb-6 text-base-content/70">{dao.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-mono text-base-content/60">
          <div>👥 {dao.members} members</div>
          <div>💰 {dao.treasury}</div>
        </div>

        <div className="flex gap-2">
          <span className="badge badge-primary font-mono">{dao.category}</span>
          <span className="badge badge-success font-mono">{dao.status}</span>
        </div>
      </div>
    </div>
  );
};

export default DAODetailModal;
