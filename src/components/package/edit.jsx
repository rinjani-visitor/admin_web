"use client";

import { PencilSimple } from "@phosphor-icons/react";

const EditPackage = ({ packageId }) => {
  return (
    <div>
      <button className="btn aspect-square p-0 btn-sm items-center">
        <PencilSimple size={24} />
      </button>
    </div>
  );
};

export default EditPackage;
