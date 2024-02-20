import { getCookie, hasCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getBaseURL from "@/libs/getBaseURL";

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

const Page = async () => {
  const cookie = hasCookie("accessToken", { cookies });

  const data = await fetchData();
  console.log(data);

  if (!cookie) {
    redirect("/");
  }

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-4 bg-slate-500 p-4 rounded-lg flex justify-center">
            <p className="font-bold">{key}:</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
