"use client";

import getBaseURL from "@/libs/getBaseURL";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { analytics } from "@/app/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCookie } from "cookies-next";
import { PencilSimple } from "@phosphor-icons/react";
import useStore from "@/store";

const EditPackage = ({ data, sub, item, id }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [title, setTitle] = useState(item.title);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(item.subCategoryId);
  const [location, setLocation] = useState(item.location);
  const [lowestPrice, setLowestPrice] = useState(item.lowestPrice);
  const [status, setStatus] = useState(item.status);
  const [file, setFile] = useState();

  const { isLoading, setIsLoading } = useStore();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const EditPackage = async (event) => {
    event.preventDefault();

    try {
      let thumbnailUrl = undefined;

      if (file) {
        const fileRef = ref(analytics, `rinjanivisitor_admin/${file.name}`);
        await uploadBytes(fileRef, file);
        thumbnailUrl = await getDownloadURL(fileRef);
      }

      const body = {
        title: title !== item.title ? title : undefined,
        categoryId: categoryId !== item.categoryId ? categoryId : undefined,
        subCategoryId:
          subCategoryId !== item.subCategoryId ? subCategoryId : undefined,
        lowestPrice:
          lowestPrice !== item.lowestPrice ? `${lowestPrice}` : undefined,
        location: location !== item.location ? location : undefined,
        status: status !== item.status ? status : undefined,
        thumbnail: thumbnailUrl ? thumbnailUrl : undefined,
      };

      const response = await fetch(getBaseURL(`/products/${id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert("Product added successfully");
        router.refresh();
      } else {
        alert("Failed to add product. Server returned:");
        router.refresh();
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const filter = sub.filter((item) => item.categoryId === categoryId);
    setSubCategory(filter);
  }, []);

  return (
    <>
      <button
        className="btn aspect-square p-0 btn-sm btn-warning items-center"
        onClick={handleModal}
      >
        <PencilSimple size={24} />
      </button>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            onClick={handleModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form className="space-y-4" onSubmit={EditPackage}>
            <h1>Edit Package</h1>
            <div className="form-control">
              <label className="mb-2">Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="mb-2">Category</label>
              <select
                required
                value={categoryId}
                onChange={(e) => {
                  const selectedCategoryId = parseInt(e.target.value, 10);
                  setCategoryId(e.target.value);

                  const filter = sub.filter(
                    (item) => item.categoryId === selectedCategoryId
                  );

                  setSubCategory(filter);
                  setSubCategoryId("");
                }}
                className="select select-bordered w-full capitalize"
              >
                <option value={``} disabled>
                  Pilih Kategori?
                </option>
                {data.map((item, index) => (
                  <option
                    className="capitalize"
                    key={index}
                    value={item.categoryId}
                  >
                    {item.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="mb-2">Sub Category</label>
              <select
                required
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                className="select select-bordered w-full capitalize"
              >
                <option value={``} disabled>
                  Pilih Kategori?
                </option>
                {subCategory.map((item, index) => (
                  <option
                    className="capitalize"
                    key={index}
                    value={item.subCategoryId}
                  >
                    {item.subCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="mb-2">Location</label>
              <input
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="mb-2">Lowest Price</label>
              <input
                required
                value={lowestPrice}
                onChange={(e) => setLowestPrice(e.target.value)}
                inputMode="numeric"
                min={0}
                type="number"
                placeholder="Masukan Harga"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="mb-2">Status</label>
              <select
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered w-full appearance-none"
              >
                <option value="">Pilih Status</option>
                <option value={"true"}>Available</option>
                <option value={"false"}>Unavailable</option>
              </select>
            </div>
            <div className="form-control">
              <label className="mb-2">Thumbnail</label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="file-input file-input-warning w-full file-input-bordered"
              />
            </div>
            <button
              type="submit"
              className="btn btn-warning w-full text-black"
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

export default EditPackage;
