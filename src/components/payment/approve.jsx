"use client";

import getBaseURL from "@/libs/getBaseURL";
import useStore from "@/store";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Approve = ({ paymentId }) => {
  const router = useRouter();

  const { isLoading, setIsLoading } = useStore();

  const approvePayment = async () => {
    setIsLoading(true);

    const body = {
      paymentStatus: "Approved",
    };

    try {
      const response = await fetch(getBaseURL(`/payment/${paymentId}`), {
        method: "POST",
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
        onClick={approvePayment}
        className="btn btn-success aspect-square p-0 btn-sm items-center"
      >
        <Check size={24} color="#fcfcfc" />
      </button>
    </>
  );
};

export default Approve;
