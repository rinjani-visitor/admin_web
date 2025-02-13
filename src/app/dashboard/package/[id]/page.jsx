import AddAddOn from "@/components/package/addAddOn";
import AddFacilities from "@/components/package/addFacilities";
import AddFoto from "@/components/package/addFoto";
import DeleteAddOn from "@/components/package/deleteAddOn";
import DeleteFacilities from "@/components/package/deleteFacilities";
import DeletePoto from "@/components/package/deletePoto";
import EditDetail from "@/components/package/editDetail";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const fetchData = async (id) => {
  try {
    const req = await fetch(
      `https://rinjani-visitor-api-cybrddhtca-et.a.run.app/api/products/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
        },
      }
    );

    const res = await req.json();
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchFacilities = async () => {
  try {
    const req = await fetch(getBaseURL("/facilities"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    const res = await req.json();
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchAddOns = async () => {
  try {
    const req = await fetch(getBaseURL("/addOns"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });

    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Page = async ({ params }) => {
  const { id } = params;

  const [data, facilities, addOns] = await Promise.all([
    fetchData(id),
    fetchFacilities(),
    fetchAddOns(),
  ]);

  if (data?.description === null || data === null) {
    return (
      <>
        <h1>Tambahkan Detail Package</h1>
        <Link href={"/dashboard/package"}>
          <button className="btn btn-active mt-3">Back</button>
        </Link>
      </>
    );
  }

  return (
    <div className="relative">
      <h1>Detail</h1>
      <div className="my-5">
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Title
          </h1>
          <p className="text-base">{data?.title}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Status
          </h1>
          <p className="text-base">
            {data?.status ? "Available" : "Unavailable"}
          </p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Lowest Price
          </h1>
          <p className="text-base">{data?.lowestPrice}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Rating
          </h1>
          <p className="text-base">{data?.rating}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Location
          </h1>
          <p className="text-base">{data?.location}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Category
          </h1>
          <p className="text-base">{data?.category}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Sub Category
          </h1>
          <p className="text-base">{data?.subCategory}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Description
          </h1>
          <p className="text-base">
            {data?.description
              ? data?.description
              : "Tambahkan Detail deskripsi"}
          </p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Favorited Count
          </h1>
          <p className="text-base">{data?.favoritedCount}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Facilties
          </h1>
          <DeleteFacilities
            data={{
              facilities: data?.facilities,
              facilitiesId: data?.facilitiesId,
            }}
          />
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Note
          </h1>
          <p className="text-base">{data?.note}</p>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
            Add On
          </h1>
          <DeleteAddOn
            data={{ addOns: data?.addOns, addOnsId: data?.addOnsId }}
          />
        </div>
      </div>
      <h1 className="text-lg font-semibold text-rinjaniVisitor-green">Foto</h1>
      <div className="gap-4 my-3 grid grid-cols-4">
        {data?.fotos.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Image
              src={item.url}
              key={index}
              height={500}
              width={500}
              alt="asd"
              className="aspect-square h-48 object-cover"
            />
            <DeletePoto id={id} photoId={item?.fotoId} />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
          Created At
        </h1>
        <p className="text-base">{data?.createdAt}</p>
      </div>
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-rinjaniVisitor-green">
          Updated At
        </h1>
        <p className="text-base">{data?.updatedAt}</p>
      </div>
      <div className="absolute right-0 top-0 flex space-x-4">
        <AddFoto packageId={id} />
        <EditDetail data={data} />
        <AddFacilities data={facilities} />
        <AddAddOn data={addOns} />
      </div>
    </div>
  );
};

export default Page;
