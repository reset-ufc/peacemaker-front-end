import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();

  const token = cookie.get("access_token")?.value;

  const protectedRoutes = [
    "/app",
    "/app/repositories",
    "/app/incivilities",
    "/settings",
    "/settings/profile",
  ];

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
