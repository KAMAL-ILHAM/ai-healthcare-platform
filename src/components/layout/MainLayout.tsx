import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Pastikan path css ini benar

// Arahkan impor ke NavbarWrapper yang baru kamu buat
import NavbarWrapper from "@/components/layout/NavbarWrapper"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EIO Health | Your Intelligent Health Assistant",
  description: "Platform kesehatan masa depan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-gray-900`}>
        {/* Panggil NavbarWrapper di Root Layout ini */}
        <NavbarWrapper /> 
        {children}
      </body>
    </html>
  );
}