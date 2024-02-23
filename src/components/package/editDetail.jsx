"use client";

import getBaseURL from "@/libs/getBaseURL";
import { DotsThreeCircle } from "@phosphor-icons/react";
import { getCookie } from "cookies-next";
import { useState } from "react";

const EditDetail = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDesription] = useState(data?.description);
  const [duration, setDuration] = useState(data?.duration);
  const [program, setProgram] = useState(data?.program);
  const [note, setNote] = useState(data?.note);
  const [route, setRoute] = useState(data?.route);
  const [startDate, setStartDate] = useState(data?.startDate);
  const [endDate, setEndDate] = useState(data?.endDate);

  const handlerModal = () => {
    setIsOpen(!isOpen);
  };
  console.log(data.productId);

  const endpoint = {
    rinjani: `/products/rinjani`,
    homestay: `/products/homestay`,
    culture: `/products/wisata`,
    landscape: `/products/wisata`,
    event: `/products/event`,
  };

  const submitEditDetail = async (e) => {
    e.preventDefault();

    const body = {
      description,
      duration: duration ? duration : undefined,
      program: program ? program : undefined,
      note,
      productId: data.productId,
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
      route: route ? route : undefined,
    };

    console.log(body);

    try {
      const req = await fetch(
        getBaseURL(`${endpoint[data.category]}/${data.productId}`),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          body: JSON.stringify(body),
        }
      );

      const response = await req.json();

      console.log(response);

      if (req.ok) {
        alert("Edit detail successfully");
      } else {
        alert("Failed to edit detail. Server returned:");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
    } finally {
      setIsOpen(false);
      // setDesription("");
      // setDuration("");
      // setNote("");
      // setProgram("");
      // setRoute("");
      // setStartDate("");
      // setEndDate("");
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
          <h1 className="text-2xl font">Edit Detail</h1>
          <button
            onClick={handlerModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form className="space-y-4" onSubmit={submitEditDetail}>
            <div className="form-control">
              <label className="mb-2">Desription</label>
              <textarea
                required
                onChange={(e) => setDesription(e.target.value)}
                type="text"
                placeholder="Type here"
                value={description}
                rows={10}
                className="input input-bordered w-full"
              />
            </div>

            {["rinjani"].includes(data.category) && (
              <>
                {[
                  {
                    label: "Duration",
                    value: duration,
                    stateSetter: setDuration,
                  },
                  { label: "Program", value: program, stateSetter: setProgram },
                ].map((input, index) => (
                  <div key={index} className="form-control">
                    <label className="mb-2">{input.label}</label>
                    <input
                      required
                      onChange={(e) => input.stateSetter(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      value={input.value}
                    />
                  </div>
                ))}
              </>
            )}

            {data.category === "culture" || data.category === "landscape" ? (
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
                value={note}
                className="input input-bordered w-full"
              />
            </div>

            {data.category === "event" ? (
              <>
                <div className="form-control">
                  <label className="mb-2">Start Date</label>
                  <input
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                    type="datetime-local"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={startDate}
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
                    value={endDate}
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

export default EditDetail;
