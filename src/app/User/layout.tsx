import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TopNav } from "./_components/topnav";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "~/app/context/CartContext";
import { SignOutButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Lcarpio's Flower Shop",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en" className={`${geist.variable}`}>
          <body>
            <div className="relative min-h-screen">
              <Header />
              <TopNav />
              <div className="absolute right-4 top-[120px] z-50">
                <SignOutButton>
                  <button className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
              {children}
              <Footer />
            </div>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
