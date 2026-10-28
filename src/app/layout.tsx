import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bazardor",
  description: "বাংলাদেশের বাজারদর জানুন সহজেই",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${hindSiliguri.className} antialiased`}>
        <Navbar />

        <main className="min-h-screen">{children}</main>

        <Footer />

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
