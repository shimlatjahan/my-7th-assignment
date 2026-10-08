"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date().toLocaleDateString("bn-BD", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setDate(today);
    };

    updateDate();

    const interval = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-2.5">

          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2.5 min-w-0"
          >
           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 p-2">
  <Image
    src="/logo-icon.png"
    alt="BazarDor Logo"
    width={28}
    height={28}
    className="h-full w-full object-contain"
    priority
  />
</div>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-green-800 leading-tight">
                বাজার দর
              </h1>

              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                {date}
              </p>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            <Link
              href="/signin"
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="bg-green-700 hover:bg-green-800 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-md transition-colors"
            >
              সাইন আপ
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}