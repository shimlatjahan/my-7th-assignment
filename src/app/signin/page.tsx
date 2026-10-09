"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, Input, Label, TextField } from "@heroui/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignInPage() {
  const router = useRouter();

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading States
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  const isLoading = loading || socialLoading !== null;

  // ============================
  // Sign In Handler
  // ============================

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Empty Field Validation
    if (!email.trim() || !password.trim()) {
      toast.error("সবগুলো তথ্য পূরণ করুন!");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("সঠিক ইমেইল অ্যাড্রেস লিখুন!");
      return;
    }

    setLoading(true);

    try {
      // Better Auth Email/Password Sign In
      const { error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      // Authentication Error
      if (error) {
        const invalidCredentials = [
          "INVALID_EMAIL_OR_PASSWORD",
          "INVALID_PASSWORD",
          "USER_NOT_FOUND",
        ];

        if (
          error.code &&
          invalidCredentials.includes(error.code)
        ) {
          toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল!");
        } else {
          toast.error("সাইন ইন করতে সমস্যা হয়েছে! আবার চেষ্টা করুন।");
        }

        return;
      }

      // Success Toast
      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      // Redirect to Home
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign In Error:", error);

      toast.error("সাইন ইন করতে সমস্যা হয়েছে! আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Social Login Handler
  // ============================

  const handleSocialLogin = async (provider: SocialProvider) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে!");
      }
    } catch (error) {
      console.error("Social Login Error:", error);

      toast.error("সোশ্যাল লগইন করতে সমস্যা হয়েছে!");
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <main className="min-h-[70vh] bg-[#F1F6F2] px-4 pt-12 pb-20 sm:pt-16">
      <div className="mx-auto w-full max-w-[440px]">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#1F2937]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            ইমেইল এবং পাসওয়ার্ড দিয়ে আপনার
            অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-xl border border-[#E5EAE6] bg-white p-6 shadow-sm sm:p-7">

          {/* Sign In Form */}
          <form
            onSubmit={handleSignIn}
            noValidate
            className="space-y-4"
          >

            {/* Email */}
            <TextField name="email" isRequired>
              <Label className="mb-2 block text-sm font-medium text-gray-800">
                ইমেইল
              </Label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600"
              />
            </TextField>

            {/* Password */}
            <TextField name="password" isRequired>
              <Label className="mb-2 block text-sm font-medium text-gray-800">
                পাসওয়ার্ড
              </Label>

              <Input
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600"
              />
            </TextField>

            {/* Sign In Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-2 w-full cursor-pointer rounded-lg bg-[#008C45] py-3 text-sm font-semibold text-white transition hover:bg-[#007638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "সাইন ইন হচ্ছে..."
                : "সাইন ইন"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-500">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isLoading}
              onPress={() => handleSocialLogin("google")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FcGoogle size={17} />

              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে লগইন করুন"}
            </Button>

            {/* GitHub */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isLoading}
              onPress={() => handleSocialLogin("github")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FaGithub size={17} />

              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে লগইন করুন"}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              অ্যাকাউন্ট নেই?{" "}

              <Link
                href="/signup"
                className="font-semibold text-[#008C45] hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}