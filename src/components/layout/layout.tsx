import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // Pastikan baris ini ada

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EIO Health | Your Intelligent Health Assistant",
  description: "Platform kesehatan masa depan dengan bantuan AI untuk konsultasi dan edukasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-gray-900`}>
        <Navbar /> {/* Pastikan ini ada di atas {children} */}
        {children}
      </body>
    </html>
  );
}