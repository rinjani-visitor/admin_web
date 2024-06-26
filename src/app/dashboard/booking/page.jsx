import Approve from "@/components/booking/approve";
import Declined from "@/components/booking/declined";
import DetailBooking from "@/components/booking/detail";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL("/booking"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {}
};

const Page = async () => {
  const data = await fetchData();

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6">Booking</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Booking ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Title</th>
            <th>Name</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="odd:bg-slate-400">
          {data?.map((item, index) => (
            <tr key={index} className="odd:bg-slate-100">
              <th>{index + 1}</th>
              <td>
                <Link
                  href={`/dashboard/booking/${item.bookingId}`}
                  className="hover:underline cursor-pointer"
                >
                  {item.bookingId}
                </Link>
              </td>
              <td>{item.bookingStatus}</td>
              <td>{item.bookingDate}</td>
              <td>{item.title}</td>
              <td>{item.customerName}</td>
              <td>{item.customerCountry}</td>
              <td className="flex space-x-4 justify-end">
                {item.bookingStatus === "Offering" ? (
                  <>
                    <Approve {...item} />
                    <Declined {...item} />
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
