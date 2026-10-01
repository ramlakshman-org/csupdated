import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-cookie";

export const config = {
  matcher: ["/admin/:path*"],
};

async function isValidSession(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const buf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`cs:${password}`)
  );

  const expected = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return token === expected;
}

export default async function middleware(req: NextRequest) {
  // Let the login page through so we don't loop
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (token && (await isValidSession(token))) return NextResponse.next();

  return NextResponse.redirect(new URL("/admin/login", req.url));
}
