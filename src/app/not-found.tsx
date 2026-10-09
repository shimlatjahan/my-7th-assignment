import Link from "next/link";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#F1F6F2] px-4 py-16">
      <div className="mx-auto w-full max-w-lg text-center">

        {/* 404 Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <FiAlertCircle className="text-4xl text-green-700" />
          </div>
        </div>

        {/* 404 Number */}
        <h1 className="text-7xl font-extrabold tracking-tight text-green-700 sm:text-8xl">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-600 sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল হতে পারে।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          <FiHome size={18} />
          হোম পেজে ফিরে যান
        </Link>

      </div>
    </section>
  );
}