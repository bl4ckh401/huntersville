import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HuntersVilleTours - Premium Travel Experiences",
  description: "Crafting Unforgettable Journeys Across the Cradle of Humanity. Discover, customize, and book premium travel experiences across the globe. From coastal retreats to wildlife safaris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} bg-surface text-on-surface font-inter antialiased selection:bg-primary-container selection:text-on-primary-container`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
