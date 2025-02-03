import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/login", "/signup"];

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req }).then((res) => res?.sub);

  const isProtectedRoute = !publicRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default middleware;
