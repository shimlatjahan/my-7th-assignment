"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending, refetch } =
    authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  // Set Current User Name
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  // Update Information Handler
  const handleUpdate = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Empty Name Validation
    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন!");
      return;
    }

    // No Changes
    if (name.trim() === user?.name) {
      toast.info("কোনো পরিবর্তন করা হয়নি!");
      return;
    }

    setUpdating(true);

    try {
      // Better Auth Update User
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(
          error.message || "তথ্য আপডেট করা যায়নি!"
        );
        return;
      }

      // Refresh Session
      await refetch();

      // Success Toast
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      // Navigate to Profile Page
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.error(
        "তথ্য আপডেট করতে সমস্যা হয়েছে! আবার চেষ্টা করুন।"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-[#F1F6F2] px-4">
        <div className="w-full max-w-[600px] animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200" />

          <div className="h-56 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  // Protected Page
  if (!user) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center gap-4 bg-[#F1F6F2] px-4">
        <h2 className="text-center text-xl font-semibold text-gray-800">
          তথ্য আপডেট করতে প্রথমে সাইন ইন করুন।
        </h2>

        <Link
          href="/signin"
          className="rounded-lg bg-[#008C45] px-6 py-3 font-semibold text-white"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-[75vh] bg-[#F1F6F2] px-4 pt-14 pb-24">
      <div className="mx-auto w-full max-w-[600px]">

        {/* Back to Profile */}
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
        >
          <FiArrowLeft size={17} />

          প্রোফাইলে ফিরে যান
        </Link>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#1F2937]">
            তথ্য আপডেট করুন
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>
        </div>

        {/* Update Form Card */}
        <div className="rounded-xl border border-[#E5EAE6] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="mb-6 text-base font-bold text-gray-900">
            তথ্য
          </h2>

          <form
            onSubmit={handleUpdate}
            noValidate
            className="space-y-5"
          >

            {/* Name Input */}
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#008C45]"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={updating}
              className="w-full cursor-pointer rounded-lg bg-[#008C45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#007638] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updating
                ? "আপডেট হচ্ছে..."
                : "তথ্য আপডেট করুন"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}