import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 pb-[80px] md:pb-0 w-full">
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}
