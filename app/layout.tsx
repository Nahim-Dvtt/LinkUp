import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkUp - Connectez-vous avec vos amis",
  description: "LinkUp est une plateforme de réseautage social qui vous permet de rester connecté avec vos amis, partager des moments et découvrir de nouvelles personnes. Rejoignez-nous pour créer des liens durables et enrichir votre vie sociale en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="navbar">
          <nav className="nav-container">
            <Link href="/" className="logo">LinkUp</Link>

            <div className="nav-links">
              <Link href="/">Accueil</Link>
              <Link href="/explore">Explorer</Link>
              <Link href="/profile">Profil</Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
