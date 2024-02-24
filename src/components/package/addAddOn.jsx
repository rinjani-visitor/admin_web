"use client";

import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FolderSimplePlus } from "@phosphor-icons/react";

const AddAddOn = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const handlerModal = () => setIsOpen(!isOpen);
  const router = useRouter();
  const { id } = useParams();

  const handleCheckboxChange = (id) => {
    const isChecked = facilities.includes(id);
    if (isChecked) {
      setFacilities((prevValues) => prevValues.filter((value) => value !== id));
    } else {
      setFacilities((prevValues) => [...prevValues, id]);
    }
  };

  const submitAddAddOn = async (e) => {
    e.preventDefault();

    const body = {
      idaddons: facilities,
    };

    try {
      const res = await fetch(getBaseURL(`/addOns/${id}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert("success add facilites");
      } else {
        alert("failed request");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <div>
      <button
        onClick={handlerModal}
        className="btn aspect-square p-0 btn-sm items-center"
      >
        <FolderSimplePlus size={24} />
      </button>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            onClick={handlerModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form onSubmit={submitAddAddOn}>
            <h1>Add AddOns</h1>
            {data?.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  id={`checkbox-${index}`}
                  type="checkbox"
                  value={item.addOnsId}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleCheckboxChange(e.target.value)}
                />
                <label
                  htmlFor={`checkbox-${index}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {item.addOnsName}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="btn btn-neutral w-full text-white"
              // disabled={isLoading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddOn;
