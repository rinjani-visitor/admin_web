import AddAddOnsItem from "@/components/addOns/add";
import DeleteItemAddOns from "@/components/addOns/deleteItemAddOns";
import AddFacilitiesItem from "@/components/facilities/add";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const fetchData = async () => {
  try {
    const request = await fetch(getBaseURL("/addOns"), {
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
        <h1 className="text-2xl mb-2">Add on</h1>
        <AddAddOnsItem />
      </div>
      <DeleteItemAddOns data={data} />
      {/* <ul>
        {data?.map((item, index) => (
          <li key={index}>{item.addOnsName}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Page;
