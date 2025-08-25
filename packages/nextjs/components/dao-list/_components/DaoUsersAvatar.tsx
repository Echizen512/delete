import React from "react";
import { User } from "lucide-react";
import { BlockieAvatar } from "~~/components/scaffold-eth/BlockieAvatar";

type DaoUserAvatarProps = {
  totalMembers: bigint;
  userIsJoin: boolean;
  userAddress: string | undefined;
  daoAddress: string;
};

export const DaoUserAvatar: React.FC<DaoUserAvatarProps> = ({ totalMembers, userIsJoin, userAddress, daoAddress }) => {
  return (
    <div className="flex justify-center gap-2 items-center">
      {totalMembers > 0n ? (
        <div className="avatar-group -space-x-2">
          <div className="avatar">
            <div className="w-5">
              <BlockieAvatar address={userIsJoin ? (userAddress ?? daoAddress) : daoAddress} size={5} />
            </div>
          </div>
          {totalMembers > 1n && (
            <div className="avatar">
              <div className="w-5">
                <BlockieAvatar address={daoAddress.concat("2")} size={5} />
              </div>
            </div>
          )}

          {totalMembers > 2n && (
            <div className="avatar">
              <div className="w-5">
                <BlockieAvatar address={daoAddress.concat("34")} size={5} />
              </div>
            </div>
          )}

          {totalMembers > 50n && (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content text-[8px] font-semibold grid place-items-center w-5">
                <span>+50</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <User className="w-4 h-4" />
      )}

      <span className="font-semibold">{totalMembers === 0n ? "No" : totalMembers.toString()} members</span>
    </div>
  );
};
