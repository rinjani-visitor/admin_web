"use client";

import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const DeleteFacilities = ({ data }) => {
  const { id } = useParams();
  const [facilities, setFacilities] = useState([]);

  const handleCheckboxChange = (id) => {
    const isChecked = facilities.includes(id);
    if (isChecked) {
      setFacilities((prevValues) => prevValues.filter((value) => value !== id));
    } else {
      setFacilities((prevValues) => [...prevValues, id]);
    }
  };

  const resultArray = data.facilitiesId.map((facilityId, index) => ({
    facilityId,
    facilityName: data.facilities[index],
  }));

  if (resultArray.length < 1) {
    return <p>No one Facilities</p>;
  }

  const deleteFacilities = async (e) => {
    e.preventDefault();
    const body = {
      idfacilities: facilities,
    };

    try {
      const req = await fetch(getBaseURL(`/facilities/${id}`), {
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
    <form onSubmit={deleteFacilities}>
      {resultArray?.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="checkbox"
            value={item.facilityId}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => handleCheckboxChange(e.target.value)}
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {item.facilityName}
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

export default DeleteFacilities;
