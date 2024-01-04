"use client"

import getBaseURL from "@/libs/getBaseURL"
import { useRouter } from "next/navigation"
import { useState } from "react"

const AddPackage = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const addPackage = async (event) => {
    event.preventDefault()

    const body = {
      title,
      categoryId,
      subCategoryId,
      lowestPrice,
      status,
      thumbnail
    }

    // try {
    //   const response = await fetch(getBaseURL('/add-products'), {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer`
    //     },
    //     body: JSON.stringify(body)
    //   })
    // } catch (error) {
    //   console.error('Error during fetch operation:', error);
    // }
  }

  return (
    <>
      <button onClick={handleModal} className="btn btn-neutral">Add</button>
      <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <button onClick={handleModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <form action="" className="space-y-4">
            <h1>Add Package</h1>
            <div className="form-control">
              <label htmlFor="" className="mb-2">Title</label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label htmlFor="" className="mb-2">Category</label>
              <select value={``} className="select select-bordered w-full">
                <option value={``} disabled>Who shot first?</option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="" className="mb-2">Location</label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label htmlFor="" className="mb-2">Lowest Price</label>
              <input min={0} type="number" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label htmlFor="" className="mb-2">Status</label>
              <select value={true} className="select select-bordered w-full appearance-none">
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="" className="mb-2">Thumbnail</label>
              <input type="file" className="file-input w-full file-input-bordered" />
            </div>
            <button className="btn btn-neutral w-full text-white">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddPackage