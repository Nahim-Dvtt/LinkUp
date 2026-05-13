import { auth } from "@/auth";

export default auth((req) => {
  // tu peux laisser vide pour l’instant
});

export const config = {
  matcher: ["/profile/:path*"],
};