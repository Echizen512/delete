"use client";

// import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateDAOModal = () => {
  //states
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("DeFi");
  // const [treasury, setTreasury] = useState("");

  // //function
  // const handleSubmit = () => {
  //   const newDAO = { name, description, category, treasury };
  //   console.log("DAO created:", newDAO);
  // };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <XMarkIcon />
          </button>
        </form>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>

    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    //   <div className="bg-base-100 text-base-content w-full max-w-lg rounded-box shadow-xl p-8">
    //     <form className="space-y-4 font-mono">
    //       <div className="flex justify-between items-center mb-4">
    //         <h2 className="text-2xl font-bold">Create New DAO</h2>
    //         <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-xl">✖</button>
    //       </div>

    //       <div className="form-control">
    //         <label className="label">DAO Name</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           placeholder="Enter DAO name"
    //           className="input input-bordered w-full"
    //         />
    //       </div>

    //       <div className="form-control">
    //         <label className="label">Description</label>
    //         <textarea
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //           placeholder="Enter description"
    //           className="textarea textarea-bordered w-full resize-none"
    //           rows={3}
    //         />
    //       </div>

    //       <div className="form-control">
    //         <label className="label">Category</label>
    //         <select
    //           value={category}
    //           onChange={(e) => setCategory(e.target.value)}
    //           className="select select-bordered w-full"
    //         >
    //           {["DeFi", "NFT", "Gaming", "Environment", "Social"].map((cat) => (
    //             <option key={cat} value={cat}>{cat}</option>
    //           ))}
    //         </select>
    //       </div>

    //       <div className="form-control">
    //         <label className="label">Initial Treasury</label>
    //         <input
    //           type="text"
    //           value={treasury}
    //           onChange={(e) => setTreasury(e.target.value)}
    //           placeholder="e.g. $1M"
    //           className="input input-bordered w-full"
    //         />
    //       </div>

    //       <button
    //         type="button"
    //         onClick={handleSubmit}
    //         className="btn btn-primary w-full font-bold"
    //       >
    //         Launch DAO 🚀
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CreateDAOModal;
