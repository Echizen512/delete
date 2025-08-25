import React from "react";
import { LogIn } from "lucide-react";
import { DaoUserAvatar } from "./DaoUsersAvatar";
import { LOCAL_STORAGE_KEYS } from "~~/constants/localStorageKeys";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useLoginStore } from "~~/services/store/daoLogin.store";

type DaoPreviewCardProps = {
  daoAddress: string;
  name: string;
  description: string;
  category: string;
  userAddress: string | undefined;
  showModalJoinDao: (address: string) => void;
};

//TODO: falta agregar cuanto tienen en el vault y tambien poner el address del creador para que la card no este tan vacia
export const DaoPreviewCard: React.FC<DaoPreviewCardProps> = ({
  daoAddress,
  name,
  description,
  category,
  userAddress,
  showModalJoinDao,
}) => {
  const { setIsLogin } = useLoginStore();

  //smart contract
  const { data: totalMembers } = useScaffoldReadContract({
    contractName: "DaoForge",
    functionName: "userCounter",
    address: daoAddress,
  });

  const { data: userIsJoin } = useScaffoldReadContract({
    contractName: "DaoForge",
    functionName: "isJoin",
    args: ["0xD2692F9df925D18D527ABe8b3d99EE9E9C8d75AE"],
    address: daoAddress,
  });

  //functions
  const handleLogIn = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LOGIN, "true");
    localStorage.setItem(LOCAL_STORAGE_KEYS.DAO_LOGIN_ADDRESS, daoAddress);
    setIsLogin(true);
  };

  return (
    <article className="card bg-base-100 shadow-2xl border">
      <div className="card-body">
        <div className="flex justify-between mb-2">
          <span className="badge badge-primary">{category}</span>

          {/* <span className="badge badge-success">{dao.status}</span> */}
        </div>
        <h2 className="card-title">{name}</h2>
        <p className="text-sm">{description}</p>
        <div className="flex justify-between text-sm mt-4">
          {totalMembers === undefined || userIsJoin === undefined ? (
            <span className="skeleton bg-secondary w-32 h-6" />
          ) : (
            <DaoUserAvatar
              totalMembers={totalMembers}
              userIsJoin={userIsJoin}
              userAddress={userAddress}
              daoAddress={daoAddress}
            />
          )}
          {/* <span>💰 {dao.treasury}</span> */}
        </div>
        <div className="card-actions mt-4 justify-between">
          {userIsJoin !== undefined && !userIsJoin ? (
            <button onClick={() => showModalJoinDao(daoAddress)} className="btn btn-primary btn-sm">
              <LogIn className="w-4 h-4" />
              Join DAO
            </button>
          ) : (
            <button onClick={handleLogIn} className="btn btn-primary btn-sm">
              <LogIn className="w-4 h-4" />
              Log In
            </button>
          )}
          {/* <button onClick={() => setViewDAO(dao)} className="btn btn-outline btn-sm">
                    VIEW
                  </button> */}
        </div>
      </div>
    </article>
  );
};
