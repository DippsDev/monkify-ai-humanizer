import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bungee = localFont({
  src: "../public/fonts/Bungee/Bungee-Regular.ttf",
  variable: "--font-bungee",
});

const fredoka = localFont({
  src: "../public/fonts/Fredoka/Fredoka-VariableFont_wdth,wght.ttf",
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Monkify - Student Software Service",
  description: "A software service for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable} ${fredoka.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-fredoka)' }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
