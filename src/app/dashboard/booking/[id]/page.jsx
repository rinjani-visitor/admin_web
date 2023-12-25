import getBaseURL from "@/libs/getBaseURL"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import Image from 'next/image'

const Page = async ({ params }) => {
  const { id } = params

  const fetchData = async () => {
    try {
      const response = await fetch(getBaseURL(`/booking/${id}`), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie('accessToken', { cookies })}`
        }
      })
      const { data } = await response.json()
      console.log(data);
      return data
    } catch (error) {
      console.log('error fetch:', error);
    }
  }

  const data = await fetchData()
  return (
    <>
      <div className="max-w-4xl p-4 space-y-4">
        <div className="flex space-x-6 items-center">
          <h1 className="font-semibold text-2xl text-rinjaniVisitor-green">Booking Details</h1>
          <p>{data?.bookingStatus}</p>
          {/* <BookingStatus status={data?.paymentStatus} /> */}
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          <p>Booking Id: {data?.bookingId}</p>
          <p>Booking Date: {data?.createdAt}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="">
            <Image src={data?.thumbnail} height={500} width={500} alt="thumbnail product" className="rounded-2xl" />
            <h1 className="font-semibold mt-2 text-2xl text-gray-700 max-sm:text-lg max-lg:text-xl ">{data?.title}</h1>
          </div>
          <div className="">
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Start Date Time</h1>
              <p className="text-base">{data?.startDateTime}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Total Person</h1>
              <p className="text-base">{data?.totalPersons}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Offering Price</h1>
              <p className="text-base">{data?.offeringPrice}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Add On</h1>
              <p className="text-base">{data?.addOns}%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page