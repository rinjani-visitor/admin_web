import getBaseURL from "@/libs/getBaseURL"
import { getCookie } from "cookies-next"
import { cookies } from 'next/headers';
import Image from 'next/image'

const Page = async ({ params }) => {
  const { id } = params
  const fetchData = async () => {
    try {
      const response = await fetch(getBaseURL(`/payment/${id}`), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie('accessToken', { cookies })}`
        }
      })
      const { data } = await response.json()
      console.log(data);
      return data
    } catch (error) {

    }
  }

  const data = await fetchData()

  return (
    <>
      <div className="max-w-4xl p-4 space-y-4">
        <div className="flex space-x-6 items-center">
          <h1 className="font-semibold text-2xl text-rinjaniVisitor-green">Payment Details</h1>
          <p>{data?.paymentStatus}</p>
          {/* <BookingStatus status={data?.paymentStatus} /> */}
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          <p>Payment Id: {data?.paymentId}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="">
            <Image src={data?.imageProofTransfer} height={500} width={500} alt="thumbnail product" className="rounded-2xl" />
            <h1 className="font-semibold mt-2 text-2xl text-gray-700 max-sm:text-lg max-lg:text-xl ">{data?.title}</h1>
          </div>
          <div className="">
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Tax</h1>
              <p className="text-base">{data?.tax}%</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Sub total</h1>
              <p className="text-base">${data?.subTotal}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Total</h1>
              <p>{data?.total}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Method</h1>
              <p>{data?.method}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Bank / Wise Account Name</h1>
              <p>{data?.bankNameOrWiseEmail}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Bank / Wise Name</h1>
              <p>{data?.bankAccountNameOrWiseAccountName}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Customer Name</h1>
              <p>{data?.customerName}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Customer Country</h1>
              <p>{data?.customerCountry}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page