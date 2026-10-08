"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "হোম", icon: "🏠", href: "/" },
  { name: "চাল", icon: "🍚", href: "/category/chal" },
  { name: "ডাল", icon: "🥣", href: "/category/dal" },
  { name: "তেল", icon: "🫙", href: "/category/tel" },
  { name: "সবজি", icon: "🥬", href: "/category/shobji" },
  { name: "মাছ", icon: "🐟", href: "/category/mach" },
  { name: "মাংস", icon: "🥩", href: "/category/mangsho" },
  { name: "ডিম-দুধ", icon: "🥛", href: "/category/dim-dudh" },
  { name: "মসলা", icon: "🌶️", href: "/category/mosla" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center justify-start gap-5 sm:gap-7 overflow-x-auto py-3 pl-5 sm:pl-8 lg:pl-12">

          {categories.map((category) => {
            const isActive = pathname === category.href;

            return (
              <Link
                key={category.href}
                href={category.href}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium transition-colors ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                <span className="text-sm">{category.icon}</span>

                <span>{category.name}</span>
              </Link>
            );
          })}

        </div>

      </div>
    </nav>
  );
}