import Approve from "@/components/payment/approve";
import Declined from "@/components/payment/declined";
import DetailPayment from "@/components/payment/detail";
import getBaseURL from "@/libs/getBaseURL"
import { getCookie, hasCookie } from "cookies-next"
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL('/payment'), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken', { cookies })}`
      },
    })
    const { data } = await response.json()
    return data
  } catch (error) {

  }
}

const Page = async () => {
  const cookie = hasCookie('accessToken', { cookies })
  if (!cookie) {
    redirect('/')
  }
  const data = await fetchData()

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6">Payment </h1>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Payment ID</th>
            <th>Booking ID</th>
            <th>Title</th>
            <th>Total</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
            <th>Name</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="odd:bg-slate-400">
          {
            data?.map((item, index) => (
              <tr key={index} className="odd:bg-slate-100">
                <th>{index + 1}</th>
                <td>{item.paymentId}</td>
                <td>{item.bookingId}</td>
                <td>{item.title}</td>
                <td>{item.total}</td>
                <td>{item.method}</td>
                <td>{item.paymentStatus}</td>
                <td>{item.updatePaymentDate}</td>
                <td>{item.customerName}</td>
                <td>{item.customerCountry}</td>
                <td className="flex space-x-4 justify-end">
                  {item.paymentStatus === 'Need a Review' ?
                    (
                      <>
                        <Approve {...item} />
                        <Declined {...item} />
                      </>
                    ) : null
                  }
                  {item.paymentStatus !== 'Pending' ?
                    (
                      <DetailPayment {...item} />
                    ) : null
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Page