"use client";

import getBaseURL from "@/libs/getBaseURL";
import { X } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Delete = ({ PackageId }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handlerModal = () => {
    setIsOpen(!isOpen);
  };

  const declinedBooking = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(getBaseURL(`/products/${PackageId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log("Error Approve:", error);
    }
  };

  return (
    <>
      <button
        onClick={handlerModal}
        className="btn btn-error aspect-square p-0 btn-sm items-center"
      >
        <X size={24} color="#fcfcfc" />
      </button>
      <div className={`${isOpen ? "modal modal-open" : "modal"}`}>
        <div className="modal-box">
          <form className="form-control grid" onSubmit={declinedBooking}>
            <button
              type="button"
              onClick={handlerModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <button
              type="submit"
              className="btn btn-error mt-2 text-white btn-md ms-auto w-full"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Delete;
