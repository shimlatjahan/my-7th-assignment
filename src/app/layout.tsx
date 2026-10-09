import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PriceMarquee from "@/components/PriceMarquee";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলাদেশের প্রতিদিনের বাজারদরের আপডেট",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">

        <Header />

        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <PriceMarquee />

        <main className="flex-1">
          {children}
        </main>

        {/* ToastContainer এখানে থাকবে */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
          style={{ zIndex: 99999 }}
        />

      </body>
    </html>
  );
}