import { auth } from "@/auth";

export default auth((req) => {
  // middleware de protection simple
});

export const config = {
  matcher: ["/profile/:path*"],
};