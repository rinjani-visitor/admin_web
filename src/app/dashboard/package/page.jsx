import { getCookie, hasCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AddPackage from "@/components/package/add";
import getBaseURL from "@/libs/getBaseURL";
import Image from "next/image";
import Delete from "@/components/package/delete";
import AddDetail from "@/components/package/addDetail";
import AddFoto from "@/components/package/addFoto";
import EditPackage from "@/components/package/edit";

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL("/products"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(getBaseURL("/categories"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

const fetchSubCategories = async () => {
  try {
    const response = await fetch(getBaseURL("/subcategories"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

const Page = async () => {
  const cookie = hasCookie("accessToken", { cookies });
  if (!cookie) {
    redirect("/");
  }

  const [data, categories, subCategories] = await Promise.all([
    fetchData(),
    fetchCategories(),
    fetchSubCategories(),
  ]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6">Package</h1>
      <div className="flex justify-end">
        <AddPackage data={categories} sub={subCategories} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Lowest Price</th>
            <th>Status</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="odd:bg-slate-400">
          {data?.map((item, index) => (
            <tr key={index} className="odd:bg-slate-100">
              <th>{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.location}</td>
              <td>{item.lowestPrice}</td>
              <td>{item.status ? "Available" : "Unavailable"}</td>
              <td>
                <Image
                  src={item.thumbnail}
                  width={500}
                  height={500}
                  alt="thumbnail product"
                  className="w-44 object-contain aspect-square"
                />
              </td>
              <td className="flex space-x-4 justify-end">
                <EditPackage PackageId={item.productId} />
                <AddDetail
                  PackageId={item.productId}
                  Category={item.category}
                />
                <AddFoto packageId={item.productId} />
                <Delete PackageId={item.productId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
