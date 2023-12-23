"use client"

import getBaseURL from "@/libs/getBaseURL"
import { X } from "@phosphor-icons/react/dist/ssr"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Declined = ({ bookingId }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [message, setIsMessage] = useState('')

  const handlerModal = () => {
    setIsMessage('')
    setIsOpen(!isOpen)
  }

  const declinedBooking = async (event) => {
    event.preventDefault()
    const body = {
      bookingStatus: "Declined",
      adminMessage: message
    }

    try {
      const response = await fetch(getBaseURL(`/booking/${bookingId}`), {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(body)
      })

      const result = await response.json()
      console.log(result);

      if (response.ok) {
        setIsOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.log('Error Approve:', error);
    }
  }

  return (
    <>
      <button onClick={handlerModal} className="btn btn-error aspect-square p-0 btn-sm items-center">
        <X size={24} color="#fcfcfc" />
      </button>
      <div className={`${isOpen ? "modal modal-open" : "modal"}`}>
        <div className="modal-box">
          <form className="form-control grid" onSubmit={declinedBooking}>
            <button type="button" onClick={handlerModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <label className="mb-2 text-lg font-medium">Admin Message</label>
            <input value={message} onChange={(event) => setIsMessage(event.target.value)} type="text" className="input input-bordered" />
            <button type="submit" className="btn btn-error mt-2 text-white w-1/4 btn-md ms-auto">Decline</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Declined