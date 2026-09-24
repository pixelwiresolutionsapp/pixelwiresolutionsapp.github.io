import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelWire Solutions | Laptop Bags, Tech & More",
  description: "Shop laptop bags, sleeves, backpacks, cases and tech accessories from Klipxtreme, Targus, HP, Dell & more. Order via WhatsApp in Jamaica.",
  keywords: ["laptop bags", "backpacks", "Klipxtreme", "Targus", "HP", "Dell", "Jamaica", "WhatsApp order"],
  icons: {
    icon: "https://pixelwiresolutionsapp.github.io/logo.jpg",
  },
  openGraph: {
    title: "PixelWire Solutions | Laptop Bags, Tech & More",
    description: "Shop laptop bags, sleeves, backpacks and tech accessories in Jamaica",
    url: "https://pixelwiresolutionsapp.github.io",
    siteName: "PixelWire Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
