import React, { useState } from "react";
import { DoorClosedLocked, Loader, LogIn, X } from "lucide-react";
import { LOCAL_STORAGE_KEYS } from "~~/constants/localStorageKeys";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";
import { useLoginStore } from "~~/services/store/daoLogin.store";

type JoinDAOModalProps = {
  contractAddress?: string;
};

export const JoinDAOModal: React.FC<JoinDAOModalProps> = ({ contractAddress }) => {
  const { setIsLogin } = useLoginStore();

  //states
  const [isLoading, setIsLoading] = useState(false);

  //smart contract
  const { writeContractAsync: writeDaoForgeAsync } = useScaffoldWriteContract({
    contractName: "DaoForge",
    contractAddress,
  });

  //functions
  const handleJoinDao = async () => {
    try {
      setIsLoading(true);
      await writeDaoForgeAsync({
        functionName: "joinDao",
      });

      localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LOGIN, "true");
      setIsLogin(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="modal_join_dao" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            id="btn-close-modal"
            className="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </button>
        </form>
        <h3 className="font-bold text-lg">Create a New DAO!</h3>
        <p className="py-2 my-0 text-sm text-base-content/80">
          Build the future of your community, without intermediaries and with complete transparency.
        </p>

        <section className="p-1 flex justify-center gap-10">
          <form method="dialog">
            <button id="btn-close-modal" className="btn btn-error">
              <DoorClosedLocked />
              Cancel
            </button>
          </form>

          <button onClick={handleJoinDao} className="btn btn-success" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Confirm
              </>
            )}
          </button>
        </section>
      </div>
    </dialog>
  );
};

// <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//   <div className="bg-base-100 text-base-content w-full max-w-md rounded-box shadow-xl p-8">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-2xl font-bold font-mono">Join {dao.name}?</h2>
//       <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">
//         ✖
//       </button>
//     </div>

//     <p className="text-sm font-mono mb-6 text-base-content/70">
//       Youre about to join {dao.name}, a DAO focused on {dao.description}. Confirm your participation.
//     </p>

//     <div className="flex gap-4">
//       <button onClick={onConfirm} className="btn btn-primary flex-1 font-bold font-mono">
//         Confirm
//       </button>
//       <button onClick={onClose} className="btn btn-outline flex-1 font-bold font-mono">
//         Cancel
//       </button>
//     </div>
//   </div>
// </div>
