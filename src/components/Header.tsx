"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/UserAvatar";

export default function Header() {
  const [date, setDate] = useState("");

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  // Bengali Date
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
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-2.5">

          {/* Logo Section */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5"
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
              <h1 className="text-base leading-tight font-bold text-green-800 sm:text-lg">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                {date}
              </p>
            </div>
          </Link>

          {/* Authentication / Avatar Section */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {isPending ? (
              // Session Loading
              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
            ) : session?.user ? (
              // Logged In: Avatar + Username
              <UserAvatar />
            ) : (
              // Logged Out: Sign In + Sign Up
              <>
                <Link
                  href="/signin"
                  className="text-xs font-medium text-gray-700 transition-colors hover:text-green-700 sm:text-sm"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-md bg-green-700 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-green-800 sm:px-4 sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}