import { auth } from "@clerk/nextjs/server";

export default auth((req) => {
  return;
});

export const config = {
  matcher: ["/profile/:path*"],
};