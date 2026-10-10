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

export default function SignUpPage() {
  const router = useRouter();

  // ============================
  // Form States
  // ============================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ============================
  // Loading States
  // ============================

  const [loading, setLoading] = useState(false);

  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  const isLoading = loading || socialLoading !== null;

  // ============================
  // Sign Up Handler
  // ============================

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Empty Field Validation

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("সবগুলো তথ্য পূরণ করুন!");
      return;
    }

    // 2. Name Validation

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে!");
      return;
    }

    // 3. Email Validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("সঠিক ইমেইল অ্যাড্রেস লিখুন!");
      return;
    }

    // 4. Password Validation

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    // 5. Confirm Password Validation

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    setLoading(true);

    try {
      // ============================
      // Better Auth Email Sign Up
      // ============================

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      // ============================
      // Authentication Error
      // ============================

      if (error) {
        console.error("Better Auth Sign Up Error:", {
          code: error.code,
          message: error.message,
          status: error.status,
        });

        if (
          error.code === "USER_ALREADY_EXISTS" ||
          error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
        ) {
          toast.error("এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে!");
        } else {
          toast.error(
            error.message || "সাইন আপ করতে সমস্যা হয়েছে!"
          );
        }

        return;
      }

      // ============================
      // Registration Success
      // ============================

      toast.success(
        "অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।",
        {
          autoClose: 3000,
        }
      );

      // ============================
      // Redirect to Sign In Page
      // ============================

      router.replace("/signin");
      router.refresh();

    } catch (error) {
      console.error("Sign Up Error:", error);

      toast.error(
        "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে! আবার চেষ্টা করুন।"
      );
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
        console.error("Social Login Error:", {
          provider,
          code: error.code,
          message: error.message,
        });

        toast.error(
          error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে!"
        );
      }
    } catch (error) {
      console.error("Social Login Error:", error);

      toast.error(
        "সোশ্যাল লগইন করতে সমস্যা হয়েছে!"
      );
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <main className="min-h-[70vh] bg-[#F1F6F2] px-4 pt-12 pb-20 sm:pt-16">
      <div className="mx-auto w-full max-w-[440px]">

        {/* ============================
            Heading
        ============================ */}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#1F2937]">
            সাইন আপ
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন।
          </p>
        </div>

        {/* ============================
            Sign Up Card
        ============================ */}

        <div className="rounded-xl border border-[#E5EAE6] bg-white p-6 shadow-sm sm:p-7">

          {/* ============================
              Sign Up Form
          ============================ */}

          <form
            onSubmit={handleSignUp}
            noValidate
            className="space-y-4"
          >

            {/* Name */}

            <TextField name="name" isRequired>
              <Label className="mb-2 block text-sm font-medium text-gray-800">
                নাম
              </Label>

              <Input
                type="text"
                placeholder="আপনার সম্পূর্ণ নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600"
              />
            </TextField>

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
                placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600"
              />
            </TextField>

            {/* Confirm Password */}

            <TextField name="confirmPassword" isRequired>
              <Label className="mb-2 block text-sm font-medium text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                type="password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600"
              />
            </TextField>

            {/* Sign Up Button */}

            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-2 w-full cursor-pointer rounded-lg bg-[#008C45] py-3 text-sm font-semibold text-white transition hover:bg-[#007638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "সাইন আপ"}
            </Button>

          </form>

          {/* ============================
              Divider
          ============================ */}

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-500">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* ============================
              Social Login Buttons
          ============================ */}

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
                : "Google দিয়ে সাইন আপ"}
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
                : "GitHub দিয়ে সাইন আপ"}
            </Button>

          </div>

          {/* ============================
              Sign In Link
          ============================ */}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              আগে থেকেই অ্যাকাউন্ট আছে?{" "}

              <Link
                href="/signin"
                className="font-semibold text-[#008C45] hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>

        </div>

        {/* ============================
            Back to Home
        ============================ */}

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