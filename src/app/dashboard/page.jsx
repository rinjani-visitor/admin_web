import { hasCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Page = async () => {
  const cookie = hasCookie("accessToken", { cookies });
  if (!cookie) {
    redirect("/");
  }

  return <div>ini dashboard</div>;
};

export default Page;
