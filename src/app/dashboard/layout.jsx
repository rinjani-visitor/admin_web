import Logout from "@/components/logout";
import Link from "next/link";

const RootLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-200 dark:bg-gray-600">
      <div className="w-64 bg-gray-800">
        <div className="text-white p-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <ul className="mt-4">
            <li className="py-2">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/package"
                className="text-gray-400 hover:text-white"
              >
                Package
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/booking"
                className="text-gray-400 hover:text-white"
              >
                Booking
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/payment"
                className="text-gray-400 hover:text-white"
              >
                Payment
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/facilities"
                className="text-gray-400 hover:text-white"
              >
                Facilities
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/addons"
                className="text-gray-400 hover:text-white"
              >
                Add Ons
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Welcome, Admin!</h1>
          <Logout />
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <div className="bg-white py-6 px-8 rounded shadow">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
