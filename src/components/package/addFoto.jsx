/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useEffect, useState } from "react";
import { Image } from "@phosphor-icons/react";
import { analytics } from "@/app/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import useStore from "@/store";

const AddFoto = ({ packageId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState([]);

  const { isLoading, setIsLoading } = useStore();

  const router = useRouter();

  const handlerModal = () => {
    setIsOpen(!isOpen);
  };

  const submitPhotos = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const urls = [];

    const uploadPromises = file.map(async (file) => {
      const fileRef = ref(analytics, `rinjanivisitor_admin/${file.name}`);
      const uploadTask = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      urls.push(url);
    });

    await Promise.all(uploadPromises);

    try {
      const req = await fetch(getBaseURL(`/products/fotos/${packageId}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ urls }),
      });

      if (req.ok) {
        alert("Success");
      } else {
        alert("Failed");
      }
    } catch (error) {
    } finally {
      setIsOpen(false);
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <button
        onClick={handlerModal}
        className="btn btn-warning aspect-square p-0 btn-sm items-center"
      >
        <Image size={24} fill="white" />
      </button>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            onClick={handlerModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form onSubmit={submitPhotos} className="space-y-4">
            <div className="form-control">
              <label className="mb-2">Add Foto</label>
              <input
                required
                multiple
                onChange={(e) => setFile([...e.target.files])}
                type="file"
                className="file-input w-full file-input-bordered"
              />
            </div>
            <button
              type="submit"
              className="btn btn-neutral w-full text-white"
              disabled={isLoading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFoto;
