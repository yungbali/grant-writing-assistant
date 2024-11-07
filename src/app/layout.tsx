import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GrantProvider } from "@/context/GrantContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Grant Writing Assistant",
  description: "AI-powered grant writing assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <GrantProvider>
          {children}
        </GrantProvider>
      </body>
    </html>
  );
}
