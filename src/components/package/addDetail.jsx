"use client";

import getBaseURL from "@/libs/getBaseURL";
import { DotsThreeCircle } from "@phosphor-icons/react";
import { getCookie } from "cookies-next";
import { useState } from "react";

const AddDetail = ({ PackageId, Category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handlerModal = () => {
    setIsOpen(!isOpen);
  };

  const [description, setDesription] = useState("");
  const [duration, setDuration] = useState("");
  const [program, setProgram] = useState("");
  const [note, setNote] = useState("");
  const [route, setRoute] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const endpoint = {
    rinjani: `/products/rinjani`,
    homestay: `/products/homestay`,
    culture: `/products/wisata`,
    landscape: `/products/wisata`,
    event: `/products/event`,
  };

  const submitAddDetail = async (e) => {
    e.preventDefault();

    const body = {
      description,
      duration: duration ? duration : undefined,
      program: program ? program : undefined,
      note,
      productId: PackageId,
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
      route: route ? route : undefined,
    };

    try {
      const req = await fetch(getBaseURL(`${endpoint[Category]}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      if (req.ok) {
        alert("Detail added successfully");
      } else {
        alert("Failed to add product. Server returned:");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
    } finally {
      setIsOpen(false);
      setDesription("");
      setDuration("");
      setNote("");
      setProgram("");
      setRoute("");
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <>
      <button
        onClick={handlerModal}
        className="btn btn-primary aspect-square p-0 btn-sm items-center"
      >
        <DotsThreeCircle size={24} />
      </button>

      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h1 className="text-2xl font">Add Detail</h1>
          <button
            onClick={handlerModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <form className="space-y-4" onSubmit={submitAddDetail}>
            <div className="form-control">
              <label className="mb-2">Desription</label>
              <input
                required
                onChange={(e) => setDesription(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            {["rinjani"].includes(Category) && (
              <>
                {[
                  { label: "Duration", stateSetter: setDuration },
                  { label: "Program", stateSetter: setProgram },
                ].map((input, index) => (
                  <div key={index} className="form-control">
                    <label className="mb-2">{input.label}</label>
                    <input
                      required
                      onChange={(e) => input.stateSetter(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                  </div>
                ))}
              </>
            )}

            {Category === "culture" || Category === "landscape" ? (
              <>
                <div className="form-control">
                  <label className="mb-2">Route</label>
                  <input
                    required
                    onChange={(e) => setRoute(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </>
            ) : null}

            <div className="form-control">
              <label className="mb-2">Note</label>
              <input
                required
                onChange={(e) => setNote(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            {Category === "event" ? (
              <>
                <div className="form-control">
                  <label className="mb-2">Start Date</label>
                  <input
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                    type="datetime-local"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="mb-2">End Date</label>
                  <input
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                    type="datetime-local"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </>
            ) : null}

            <button type="submit" className="btn btn-neutral w-full text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDetail;
