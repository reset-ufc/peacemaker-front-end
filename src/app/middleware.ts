import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime

export async function middleware(request: NextRequest) {
  const cookie = await cookies();

  const token = cookie.get("access_token")?.value;

  const protectedRoutes = [
    "/app",
    "/app/dashboard",
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
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
