import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token"); // Assuming the token is stored in a cookie
  // Pages that can be accessed without authentication

  if (request.nextUrl.pathname.startsWith("/users") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Redirect to /users if trying to access login or register page when already authenticated
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  return NextResponse.next();
}
