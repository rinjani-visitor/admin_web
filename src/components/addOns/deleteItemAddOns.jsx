"use client";

import getBaseURL from "@/libs/getBaseURL";
import useStore from "@/store";
import { getCookie } from "cookies-next";
import { useState } from "react";

const DeleteItemAddOns = ({ data }) => {
  const [facilities, setFacilities] = useState([]);

  const { isLoading, setIsLoading } = useStore();

  const handleCheckboxChange = (id) => {
    const isChecked = facilities.includes(id);
    if (isChecked) {
      setFacilities((prevValues) => prevValues.filter((value) => value !== id));
    } else {
      setFacilities((prevValues) => [...prevValues, id]);
    }
  };

  const deleteFacilitiesItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      idaddons: facilities,
    };

    try {
      console.log("a");
      const req = await fetch(getBaseURL(`/addOns`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      const res = await req.json();
      if (req.ok) {
        alert("Succes Delete, silakan refresh");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setFacilities([]);
      location.reload();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={deleteFacilitiesItem}>
        {data?.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="checkbox"
              value={item.addOnsId}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {item.addOnsName}
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="btn btn-active btn-error btn-sm"
          disabled={!facilities.length > 0 ? true : false}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteItemAddOns;
