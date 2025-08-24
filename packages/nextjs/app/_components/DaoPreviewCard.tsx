import React from "react";
import { LogIn, Users } from "lucide-react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

type DaoPreviewCardProps = {
  address: string;
  name: string;
  description: string;
  category: string;
};

export const DaoPreviewCard: React.FC<DaoPreviewCardProps> = ({ address, name, description, category }) => {
  //smart contract
  const { data: totalMembers } = useScaffoldReadContract({
    contractName: "DaoForge",
    functionName: "userCounter",
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
          {totalMembers === undefined ? (
            <span className="skeleton w-10 h-5" />
          ) : (
            <span className="flex justify-center gap-2">
              <Users />
              {totalMembers === 0n ? "No" : totalMembers.toString()} members
            </span>
          )}
          {/* <span>💰 {dao.treasury}</span> */}
        </div>
        <div className="card-actions mt-4 justify-between">
          <button className="btn btn-primary btn-sm">
            <LogIn className="w-4 h-4" />
            Join DAO
          </button>
          {/* <button onClick={() => setViewDAO(dao)} className="btn btn-outline btn-sm">
                    VIEW
                  </button> */}
        </div>
      </div>
    </article>
  );
};
