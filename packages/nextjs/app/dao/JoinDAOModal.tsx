"use client";
const JoinDAOModal = ({ dao, onConfirm, onClose }: { dao: any; onConfirm: () => void; onClose: () => void }) => {
  if (!dao) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 text-base-content w-full max-w-md rounded-box shadow-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-mono">Join {dao.name}?</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">
            ✖
          </button>
        </div>

        <p className="text-sm font-mono mb-6 text-base-content/70">
          Youre about to join {dao.name}, a DAO focused on {dao.description}. Confirm your participation.
        </p>

        <div className="flex gap-4">
          <button onClick={onConfirm} className="btn btn-primary flex-1 font-bold font-mono">
            Confirm
          </button>
          <button onClick={onClose} className="btn btn-outline flex-1 font-bold font-mono">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinDAOModal;
