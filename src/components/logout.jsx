"use client"

import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation";


const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('accessToken');
    router.push('/')
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Logout</button>
  )
}

export default Logout