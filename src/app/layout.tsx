import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Streaming App",
  description: "Generated by zain",
};

export default function RootLayout({
  children,
  
  
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <ClerkProvider>
<html lang="en">
      <>
      <body className={inter.className}>
      <Header></Header>
        <main className="relative z-10">
          {children} 
        </main>
        </body>
      </>
    </html>
    </ClerkProvider>
    
  );
}