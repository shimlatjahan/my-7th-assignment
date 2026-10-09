import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Left Side */}
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="text-base font-bold text-green-700 transition-colors hover:text-green-800"
            >
              বাজার দর
            </Link>

            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Side */}
          <div className="text-center sm:max-w-xs sm:text-right">
            <p className="text-xs leading-relaxed text-gray-500">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}