"use client";

import { PencilSimple } from "@phosphor-icons/react";
import { useState } from "react";

const EditPackage = ({ packageId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handlerModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="btn aspect-square p-0 btn-sm items-center"
        onClick={handlerModal}
      >
        <PencilSimple size={24} />
      </button>

      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            onClick={handlerModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPackage;
