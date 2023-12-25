import { hasCookie } from "cookies-next"
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

const Page = () => {
  const cookie = hasCookie('accessToken', { cookies })
  console.log(cookie);

  if (!cookie) {
    redirect('/')
  }
  
  return (
    <div>package</div>
  )
}

export default Page