import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

import SessionProvider from "@/components/SessionProvider";
import AuthButtons from "@/components/AuthButtons";

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Mini réseau social Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
          <header className="navbar">
            <nav className="nav-container">
              <Link href="/" className="logo">
                LinkUp
              </Link>

              <div className="nav-links">
                <Link href="/">Accueil</Link>
                <Link href="/explore">
                  Explorer
                </Link>
                <Link href="/profile">
                  Profil
                </Link>

                <AuthButtons />
              </div>
            </nav>
          </header>

          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}