import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const fetchData = async () => {
  try {
    const request = await fetch(getBaseURL("/facilities"), {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    const res = await request.json();
    console.log(res.data);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
};

const Page = async () => {
  const data = await fetchData();

  return <div>Page Facilites</div>;
};

export default Page;
