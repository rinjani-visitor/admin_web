"use client";

import getBaseURL from "@/libs/getBaseURL";
import useStore from "@/store";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Approve = ({ bookingId }) => {
  const router = useRouter();

  const { setIsLoading } = useStore();

  const approveBooking = async () => {
    setIsLoading(true);

    const body = {
      bookingStatus: "Waiting for Payment",
    };

    try {
      const response = await fetch(getBaseURL(`/booking/${bookingId}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log("Error Approve:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={approveBooking}
        className="btn btn-success aspect-square p-0 btn-sm items-center"
      >
        <Check size={24} color="#fcfcfc" />
      </button>
    </>
  );
};

export default Approve;
