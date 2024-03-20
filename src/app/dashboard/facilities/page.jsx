import AddFacilitiesItem from "@/components/facilities/add";
import DeleteItemFacilities from "@/components/facilities/deleteItemFacilities";
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
    return res.data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
};

const Page = async () => {
  const data = await fetchData();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-2">Facilities</h1>
        <AddFacilitiesItem />
      </div>
      <DeleteItemFacilities data={data} />
    </div>
  );
};

export default Page;
