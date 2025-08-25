import React from "react";
import { LogIn } from "lucide-react";
import { DaoUserAvatar } from "./DaoUsersAvatar";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

type DaoPreviewCardProps = {
  address: string;
  name: string;
  description: string;
  category: string;
  userAddress: string | undefined;
  showModalJoinDao: (address: string) => void;
};

//TODO: falta agregar cuanto tienen en el vault y tambien poner el address del creador para que la card no este tan vacia
export const DaoPreviewCard: React.FC<DaoPreviewCardProps> = ({
  address,
  name,
  description,
  category,
  userAddress,
  showModalJoinDao,
}) => {
  //smart contract
  const { data: totalMembers } = useScaffoldReadContract({
    contractName: "DaoForge",
    functionName: "userCounter",
    address,
  });

  const { data: userIsJoin } = useScaffoldReadContract({
    contractName: "DaoForge",
    functionName: "isJoin",
    args: ["0xD2692F9df925D18D527ABe8b3d99EE9E9C8d75AE"],
    address,
  });

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
              daoAddress={address}
            />
          )}
          {/* <span>💰 {dao.treasury}</span> */}
        </div>
        <div className="card-actions mt-4 justify-between">
          {userIsJoin !== undefined && !userIsJoin ? (
            <button onClick={() => showModalJoinDao(address)} className="btn btn-primary btn-sm">
              <LogIn className="w-4 h-4" />
              Join DAO
            </button>
          ) : (
            <button onClick={() => showModalJoinDao(address)} className="btn btn-primary btn-sm">
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
