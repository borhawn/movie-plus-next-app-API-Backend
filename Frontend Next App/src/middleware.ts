import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./app/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/login") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (currentPath.startsWith("/signup") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}