import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EIO Health | Your Intelligent Health Assistant",
  description: "Platform kesehatan masa depan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased bg-background text-gray-900`}>
        {/* HANYA INI YANG BOLEH ADA DI SINI */}
        <NavbarWrapper /> 
        {children}
      </body>
    </html>
  );
}