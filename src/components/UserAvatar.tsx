"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function UserAvatar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const user = session?.user;

  if (isPending) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি!");
      return;
    }

    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে!");

    router.replace("/signin");
    router.refresh();
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="প্রোফাইল মেনু"
        className="flex cursor-pointer items-center gap-2"
      >
        {/* Profile Picture */}
        {user.image && !imageError ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            onError={() => setImageError(true)}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        {/* Navbar Username */}
        <span className="hidden max-w-24 truncate text-sm font-medium text-gray-800 sm:block">
          {user.name?.split(" ")[0]}
        </span>

        
        <FiChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      
      {open && (
        <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          
          {/* User Full Name and Email */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name || "User"}
            </p>

            <p className="mt-1 truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FiUser size={16} />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
            >
              <FiLogOut size={16} />
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}