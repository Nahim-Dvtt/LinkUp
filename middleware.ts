import { auth } from "@/auth";

export function middleware(req: Request) {
  const session = auth();

  return;
}

export const config = {
  matcher: ["/profile/:path*"],
};