import DeletePoto from "@/components/package/deletePoto";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";

const fetchData = async (id) => {
  try {
    const req = await fetch(
      `https://rinjani-api-v2-nvyjfyoxzq-et.a.run.app/api/products/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
        },
      }
    );

    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error(error); // Use console.error for errors
    throw error; // Re-throw the error to propagate it
  }
};

const Page = async ({ params }) => {
  const { id } = params;

  const data = await fetchData(id);

  return (
    <div>
      <h1>Detail</h1>
      <div className="columns-4 gap-4 flex">
        {data?.fotos.map((item, index) => (
          <div key={index}>
            <Image
              src={item.url}
              key={index}
              height={500}
              width={500}
              alt="asd"
            />
            <DeletePoto id={id} photoId={item.fotoId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
