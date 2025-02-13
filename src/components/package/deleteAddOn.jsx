"use client";

import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const DeleteAddOn = ({ data }) => {
  const { id } = useParams();
  const router = useRouter();
  const [facilities, setFacilities] = useState([]);

  console.log(data);

  const handleCheckboxChange = (id) => {
    const isChecked = facilities.includes(id);
    if (isChecked) {
      setFacilities((prevValues) => prevValues.filter((value) => value !== id));
    } else {
      setFacilities((prevValues) => [...prevValues, id]);
    }
  };

  if (data.length < 1) {
    return <p>No one Add On</p>;
  }

  const deleteAddOns = async (e) => {
    e.preventDefault();

    const body = {
      idaddons: facilities,
    };

    try {
      const req = await fetch(getBaseURL(`/addOns/${id}`), {
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
    } finally {
      setFacilities([]);
      location.reload();
    }
  };

  return (
    <form action="" onSubmit={deleteAddOns}>
      {data?.addOns.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            // id={`checkbox-${index}`}
            type="checkbox"
            value={item.addOnsId}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => handleCheckboxChange(e.target.value)}
          />
          <label
            // htmlFor={`checkbox-${index}`}
            className="ms-2 text-sm font-medium text-black dark:text-gray-300"
          >
            {item.addOnsName}
            (${item.price})
          </label>
        </div>
      ))}
      <button
        className="btn btn-active btn-error btn-sm"
        disabled={!facilities.length > 0 ? true : false}
      >
        Delete
      </button>
    </form>
  );
};

export default DeleteAddOn;
