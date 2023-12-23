"use client"

import getBaseURL from "@/libs/getBaseURL"
import { X } from "@phosphor-icons/react/dist/ssr"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

const Declined = ({ paymentId }) => {
  const router = useRouter()

  const declinedPayment = async (event) => {
    event.preventDefault()
    const body = {
      paymentStatus: 'Rejected'
    }

    console.log(body);
    try {
      const response = await fetch(getBaseURL(`/payment/${paymentId}`), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(body)
      })

      const result = await response.json()
      console.log(result);

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.log('Error Approve:', error);
    }
  }

  return (
    <>
      <button onClick={declinedPayment} className="btn btn-error aspect-square p-0 btn-sm items-center">
        <X size={24} color="#fcfcfc" />
      </button>
    </>
  )
}

export default Declined