"use client";

import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

export default function CategorySort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "default";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">সাজান:</span>

      <select
        className="select select-bordered select-sm w-44 bg-white text-gray-700 focus:outline-none focus:border-green-600"
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-to-high">দাম: কম থেকে বেশি</option>
        <option value="high-to-low">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}