"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FiLogOut, FiEdit2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);
  const [linkingGoogle, setLinkingGoogle] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const user = session?.user;

  // Sign Out
  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি!");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign Out Error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
    } finally {
      setSigningOut(false);
    }
  };

  // Google Account Linking
  const handleGoogleLink = async () => {
    if (!user) {
      toast.error("প্রথমে সাইন ইন করুন!");
      return;
    }

    setLinkingGoogle(true);

    try {
      const { error } = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/profile",
      });

      if (error) {
        toast.error(error.message || "Google Account যুক্ত করা যায়নি!");
      }
    } catch (error) {
      console.error("Google Linking Error:", error);
      toast.error("Google Account যুক্ত করতে সমস্যা হয়েছে!");
    } finally {
      setLinkingGoogle(false);
    }
  };

  // Loading
  if (isPending) {
    return (
      <section className="min-h-[75vh] bg-[#F1F6F2] px-4 py-14">
        <div className="mx-auto w-full max-w-[600px] animate-pulse space-y-5">
          <div className="h-8 w-40 rounded bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-200" />
        </div>
      </section>
    );
  }

  // Not Logged In
  if (!user) {
    return (
      <section className="flex min-h-[75vh] flex-col items-center justify-center gap-4 bg-[#F1F6F2] px-4">
        <h2 className="text-center text-xl font-semibold text-gray-800">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </h2>

        <Link
          href="/signin"
          className="rounded-lg bg-[#008C45] px-6 py-3 font-semibold text-white"
        >
          সাইন ইন করুন
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-[75vh] bg-[#F1F6F2] px-4 pt-14 pb-24">
      <div className="mx-auto w-full max-w-[600px]">

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* User Information */}
            <div className="flex min-w-0 items-center gap-4">

              {/* Avatar */}
              {user.image && !avatarError ? (
                <img
                  src={user.image}
                  alt={`${user.name}-এর প্রোফাইল ছবি`}
                  onError={() => setAvatarError(true)}
                  className="h-14 w-14 shrink-0 rounded-full border border-gray-100 object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              {/* Name and Email */}
              <div className="min-w-0">
                <h2 className="text-base font-bold text-gray-900">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex cursor-pointer items-center justify-center gap-2 self-start rounded-md border border-red-400 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50 sm:self-auto"
            >
              <FiLogOut size={15} />

              {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
            </button>

          </div>
        </div>

        

        {/* Update Card */}
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-3 text-base font-bold text-gray-900">
            তথ্য
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করতে নিচের বাটনে ক্লিক করুন।
          </p>

          <Link
            href="/profile/update"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#008C45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#007638]"
          >
            <FiEdit2 size={16} />
            তথ্য আপডেট করুন
          </Link>

        </div>

      </div>
    </section>
  );
}