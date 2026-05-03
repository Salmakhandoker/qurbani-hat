import dns from "node:dns";
dns.setServers(["8.8.8.8","8.8.4.4"]);
import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Basic route protection (optional)
  if (
    pathname.startsWith("/my-profile") ||
    pathname.startsWith("/animals")
  ) {
    const user = request.cookies.get("user");

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile"],
};
// "/animals/:path"