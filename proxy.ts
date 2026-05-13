import { auth } from "@/lib/auth";

export default auth((req) => {
  // vide pour l’instant
});

export const config = {
  matcher: ["/profile/:path*"],
};