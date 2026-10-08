"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "হোম", icon: "🏠", href: "/" },
  { name: "চাল", icon: "🍚", href: "/category/chal" },
  { name: "ডাল", icon: "🫘", href: "/category/dal" },
  { name: "তেল", icon: "🫙", href: "/category/tel" },
  { name: "সবজি", icon: "🥬", href: "/category/shobji" },
  { name: "মাছ", icon: "🐟", href: "/category/mach" },
  { name: "মাংস", icon: "🍗", href: "/category/mangsho" },
  { name: "ডিম-দুধ", icon: "🥛", href: "/category/dim-dudh" },
  { name: "মসলা", icon: "🌶️", href: "/category/mosla" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Category Navigation */}
        <div className="flex items-center justify-start gap-5 overflow-x-auto py-3 sm:gap-6 md:justify-center">

          {categories.map((category) => {
            const isActive = pathname === category.href;

            return (
              <Link
                key={category.href}
                href={category.href}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 pb-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-600 hover:text-green-700"
                }`}
              >
                {/* Category Emoji */}
                <span className="text-sm">
                  {category.icon}
                </span>

                {/* Category Name */}
                <span>{category.name}</span>
              </Link>
            );
          })}

        </div>
      </div>
    </nav>
  );
}