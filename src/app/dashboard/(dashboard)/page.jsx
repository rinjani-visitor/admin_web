import { getCookie, hasCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getBaseURL from "@/libs/getBaseURL";
import PieChart from "@/components/chart/pieChart";
import BarChart from "@/components/chart/barChart";

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL("/dashboard"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchDataPayment = async () => {
  try {
    const response = await fetch(
      getBaseURL("/dashboard/payment?paymentStatus=Approved"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
        },
      }
    );

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchDataPaymentStatus = async () => {
  try {
    const response = await fetch(getBaseURL("/dashboard/paymentStatus"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchDataBookingbyStatus = async () => {
  try {
    const response = await fetch(getBaseURL("/dashboard/bookingStatus"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Page = async () => {
  // const data = await fetchData();

  const [data, paymentCategory, paymentStatus, bookingStatus] =
    await Promise.all([
      fetchData(),
      fetchDataPayment(),
      fetchDataPaymentStatus(),
      fetchDataBookingbyStatus(),
    ]);

  return (
    <div className="">
      <div className="grid grid-cols-3 mb-10">
        <div>
          <PieChart dataBar={paymentCategory.data} />
        </div>
        <div className="col-span-2">
          <BarChart
            title={"Rekap pesanan berdasarkan status"}
            dataBar={bookingStatus.data}
          />
        </div>
        <div>
          <BarChart
            title={"Rekap pembayaran berdasarkan status"}
            dataBar={paymentStatus.data}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="mb-4 bg-slate-500 p-4 rounded-lg flex flex-col items-center text-white"
          >
            <p className="font-normal capitalize">
              {key.split(/(?=[A-Z])/).join(" ")}
            </p>
            <p className="text-4xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
