"use client";

import { useState } from "react";
import { Rocket, X } from "lucide-react";
import { DAO_CATEGORIES } from "~~/constants/daoCategories";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const CreateDAOModal = () => {
  //states
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("DeFi");
  // const [treasury, setTreasury] = useState("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  //smart contract
  const { writeContractAsync: writeDaoForgeFabricAsync } = useScaffoldWriteContract({ contractName: "DaoForgeFabric" });

  //functions
  const handleSubmit = async () => {
    try {
      setIsCreating(true);

      await writeDaoForgeFabricAsync({
        functionName: "createDao",
        args: [name, description, category],
        // value: parseEther("0.1"),
      });

      setName("");
      setDescription("");
      setCategory("DeFi");
      document.getElementById("btn-close-modal")?.click();
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button id="btn-close-modal" className="btn btn-sm btn-circle btn-primary absolute right-2 top-2">
            <X className="w-4 h-4" />
          </button>
        </form>
        <h3 className="font-bold text-lg">Create a New DAO!</h3>
        <p className="py-2 my-0 text-sm text-base-content/80">
          Build the future of your community, without intermediaries and with complete transparency.
        </p>

        <section className="p-1 flex flex-col gap-4">
          <div className="form-control">
            <label className="label pl-2">DAO Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. BlockSphere"
              className="input input-bordered w-full rounded-lg"
            />
          </div>

          <div className="form-control">
            <label className="label pl-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. BlockDAO is a decentralized community focused on building open-source blockchain tools and fostering collaboration among developers worldwide."
              className="textarea textarea-bordered w-full resize-none rounded-lg"
              rows={3}
            />
          </div>

          <div className="form-control">
            <label className="label">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="select select-bordered w-full rounded-lg"
            >
              {DAO_CATEGORIES.filter(y => y !== "All").map(x => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-primary mx-2 mt-4"
            disabled={name === "" || description === "" || category == "" || isCreating}
          >
            <Rocket className="w-4 h-4" />
            Launch DAO
          </button>
        </section>
      </div>
    </dialog>
  );
};

export default CreateDAOModal;
