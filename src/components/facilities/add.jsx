"use client";

import getBaseURL from "@/libs/getBaseURL";
import useStore from "@/store";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFacilitiesItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [facilities, setFacilities] = useState("");
  const router = useRouter();

  const { isLoading, setIsLoading } = useStore();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const addFacilities = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const request = await fetch(getBaseURL("/facilities"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ facilityName: facilities }),
      });

      if (request.ok) {
        setIsOpen(false);
        router.refresh();
        alert("success add facilities");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleModal} className="btn btn-neutral">
        Add
      </button>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <form className="modal-box space-y-4" onSubmit={addFacilities}>
          <button
            onClick={handleModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h1 className="">Add Facilities</h1>
          <input
            required
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            onChange={(e) => setFacilities(e.target.value)}
          />
          <button type="submit" className="btn btn-neutral w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacilitiesItem;
