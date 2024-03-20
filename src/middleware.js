import { hasCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const isLogin = hasCookie("accessToken", { cookies });
  const { pathname } = request.nextUrl;
  if (!isLogin && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLogin && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
