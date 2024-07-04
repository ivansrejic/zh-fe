"use client";
import "./globals.css";
import { ReactNode } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import { Providers } from "./providers";
interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 px-10 py-3 ">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
