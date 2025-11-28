import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !refreshToken) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("toast", "login-required", {
      path: "/",
      maxAge: 5,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
