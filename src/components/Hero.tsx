"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
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
    <section className="pt-5 pb-7">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Hero Card */}
        <div className="bg-[#f9fcfa] border border-gray-200 rounded-2xl">

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 px-5 sm:px-7 py-6">

            {/* Left Side */}
            <div>

              {/* Dynamic Bangla Date */}
              <span className="inline-block bg-green-100 text-green-700 text-[11px] font-medium px-3 py-1 rounded-full mb-3">
                {date || "তারিখ লোড হচ্ছে..."}
              </span>

              {/* Heading */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug">
                আজকের বাজারের দাম এক নজরে
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed max-w-md">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              {/* Button */}
              <Link
                href="/#সব-পণ্য"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-xs font-medium px-4 py-2.5 rounded-md mt-5 transition"
              >
                সব পণ্য দেখুন
                <FaArrowRight size={11} />
              </Link>

            </div>

            {/* Right Side - Hero Image */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/bazar-hero.png"
                alt="BazarDor Hero Image"
                width={220}
                height={190}
                className="w-full max-w-[180px] sm:max-w-[220px] h-auto object-contain"
                priority
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}