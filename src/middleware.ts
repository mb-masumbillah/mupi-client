import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type UserRole =
  | "superAdmin"
  | "temporaryAdmin"
  | "student"
  | "instructor";

interface JwtPayload {
  role: UserRole;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // ----------------------------------
  // ❌ Not logged in
  // ----------------------------------
  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
    return NextResponse.next();
  }

  // ----------------------------------
  // 🔓 Decode token
  // ----------------------------------
  let decoded: JwtPayload;

  try {
    decoded = jwt.decode(token) as JwtPayload;
  } catch {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const role = decoded.role;

  // ----------------------------------
  // 🎯 Role dashboard map
  // ----------------------------------
  const roleDashboard: Record<UserRole, string> = {
    superAdmin: "/dashboard/super-admin",
    temporaryAdmin: "/dashboard/temporary-admin",
    student: "/dashboard/student",
    instructor: "/dashboard/instructor",
  };

  const userDashboard = roleDashboard[role];

  // ----------------------------------
  // 🚫 login user cannot access login/register
  // ----------------------------------
  if (
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return NextResponse.redirect(
      new URL(userDashboard, request.url)
    );
  }

  // ----------------------------------
  // 🔒 Dashboard protection
  // ----------------------------------

  // superAdmin → সব access
  if (role === "superAdmin") {
    return NextResponse.next();
  }

  // অন্য role নিজেরটা ছাড়া পারবে না
  if (
    pathname.startsWith("/dashboard") &&
    !pathname.startsWith(userDashboard)
  ) {
    return NextResponse.redirect(
      new URL(userDashboard, request.url)
    );
  }

  return NextResponse.next();
}
