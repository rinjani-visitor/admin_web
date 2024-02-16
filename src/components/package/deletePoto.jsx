"use client";

import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const DeletePoto = ({ id, photoId }) => {
  const router = useRouter();

  const deletePhoto = async () => {
    console.log(photoId);
    try {
      const req = await fetch(getBaseURL(`/products/foto/${id}/${photoId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      const res = await req.json();

      if (req.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <button onClick={deletePhoto} className="btn btn-error text-white btn-xs">
      Delete
    </button>
  );
};

export default DeletePoto;
