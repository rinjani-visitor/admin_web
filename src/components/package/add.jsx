"use client";

import getBaseURL from "@/libs/getBaseURL";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { analytics } from "@/app/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCookie } from "cookies-next";
import useStore from "@/store";

const AddPackage = ({ data, sub }) => {
  const router = useRouter();

  const { isLoading, setIsLoading } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [lowestPrice, setLowestPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const addPackage = async (event) => {
    setIsLoading(!isLoading);
    event.preventDefault();
    console.log(isLoading);

    try {
      const fileRef = ref(analytics, `rinjanivisitor_admin/${file.name}`);
      uploadBytes(fileRef, file).then((data) => {
        // setIsLoading(false);
        getDownloadURL(data.ref).then(async (url) => {
          const body = {
            title,
            categoryId,
            subCategoryId,
            lowestPrice: `${lowestPrice}`,
            location,
            status,
            thumbnail: url,
          };

          const response = await fetch(getBaseURL("/add-products"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
            body: JSON.stringify(body),
          });

          const result = await response.json();

          console.log(result);

          if (response.ok) {
            alert("Product added successfully");
            location.reload;
            // router.refresh();
          } else {
            router.refresh();
            alert("Failed to add product. Server returned:");
          }
        });
      });
    } catch (error) {
      console.error("Error during fetch operation:", error);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleModal} className="btn btn-neutral">
        Add
      </button>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            onClick={handleModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form className="space-y-4" onSubmit={addPackage}>
            <h1>Add Package</h1>
            <div className="form-control">
              <label className="mb-2">Title</label>
              <input
                required
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
                {data?.map((item, index) => (
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
                required
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="file-input w-full file-input-bordered"
              />
            </div>
            <button type="submit" className="btn btn-neutral w-full text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPackage;
