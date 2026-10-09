import { Suspense } from "react";

import ProductCard, { type Product } from "@/components/ProductCard";
import CategorySort from "@/components/CategorySort";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
};

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  shobji: "সবজি",
  mach: "মাছ",
  mangsho: "মাংস",
  "dim-dudh": "ডিম ও দুধ",
  mosla: "মসলা",
};

const categoryIcons: Record<string, string> = {
  chal: "🍚",
  dal: "🫘",
  tel: "🛢️",
  shobji: "🥬",
  mach: "🐟",
  mangsho: "🥩",
  "dim-dudh": "🥚",
  mosla: "🌶️",
};

// Fetch category products directly from API
async function getCategoryProducts(
  slug: string
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/products?category=${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category products");
    }

    const result = await response.json();

    const products = Array.isArray(result)
      ? result
      : Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.products)
          ? result.products
          : Array.isArray(result.data?.products)
            ? result.data.products
            : [];

    return products;
  } catch (error) {
    console.error("Category Fetch Error:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  // Fetch products
  const products = await getCategoryProducts(slug);

  // Sorting logic
  const sortedProducts = [...products];

  if (sort === "low-to-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high-to-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const categoryName = categoryNames[slug] || slug;
  const categoryIcon = categoryIcons[slug] || "🛒";

  const productCount = new Intl.NumberFormat("bn-BD").format(
    sortedProducts.length
  );

  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Category Heading */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {categoryIcon}
            </span>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {categoryName} পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Sorting Section */}
        <div className="mb-4 flex items-center justify-end rounded-xl border border-gray-200 bg-white px-5 py-4">
          <Suspense
            fallback={
              <div className="h-8 w-44 animate-pulse rounded-lg bg-gray-200" />
            }
          >
            <CategorySort />
          </Suspense>
        </div>

        {/* Product Count */}
        <p className="mb-4 text-sm text-gray-500">
          মোট {productCount}টি পণ্য পাওয়া গেছে
        </p>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <span className="text-4xl">📦</span>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </p>
          </div>
        )}

      </section>
    </main>
  );
}