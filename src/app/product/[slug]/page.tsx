import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "@/components/ProductCard";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetails = Product & {
  lastWeek?: number;
  lastMonth?: number;
  markets: Market[];
};

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

// Fetch Single Product
async function getProduct(id: string): Promise<ProductDetails | null> {
  try {
    const response = await fetch(
      `${API_URL}/products/${encodeURIComponent(id)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    const product =
      result.data?.product ??
      result.data ??
      result.product ??
      result;

    if (
      !product ||
      typeof product !== "object" ||
      typeof product.id !== "number"
    ) {
      return null;
    }

    return {
      ...product,
      markets: Array.isArray(product.markets)
        ? product.markets
        : [],
    } as ProductDetails;
  } catch (error) {
    console.error("Product Fetch Error:", error);
    return null;
  }
}

// Convert numbers to Bangla
function banglaNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

// Translate Units
function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    litre_bottle: "বোতল",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit] || unit;
}

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  // API uses numeric product IDs
  if (!/^\d+$/.test(slug)) {
    notFound();
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets;

  // Market-wise Price Summary
  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((item) => item.min))
      : null;

  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((item) => item.max))
      : null;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, item) => total + (item.min + item.max) / 2,
          0
        ) / markets.length
      : null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  const changeText = isUp
    ? "দাম বেড়েছে"
    : isDown
      ? "দাম কমেছে"
      : "দাম অপরিবর্তিত";

  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link
            href="/"
            className="hover:text-green-700"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-800">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <div className="mb-5 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Left: Product Information */}
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f3f8f4] text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি কেজি:{" "}
                {product.unit === "kg"
                  ? "১ কেজি"
                  : `১ ${getUnit(product.unit)}`}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                গতকালের তুলনায় আজকের দাম{" "}
                <span className={`font-semibold ${changeColor}`}>
                  {isUp
                    ? "বেড়েছে"
                    : isDown
                      ? "কমেছে"
                      : "অপরিবর্তিত"}
                </span>
                {isUp || isDown
                  ? ` ${banglaNumber(priceDifference)} টাকা`
                  : ""}
              </p>
            </div>

          </div>

          {/* Right: Today's Price */}
          <div className="w-full rounded-xl bg-[#f3f8f4] px-6 py-4 text-center sm:w-auto sm:min-w-36">

            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {banglaNumber(product.today)}
            </h2>

            <p className="text-xs text-gray-500">
              টাকা / {getUnit(product.unit)}
            </p>

            <p className={`mt-2 text-xs font-semibold ${changeColor}`}>
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {banglaNumber(product.change?.pct ?? 0)}%
            </p>

          </div>

        </div>

        {/* Market Summary and Table */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

          {/* Summary Heading */}
          <h2 className="mb-4 text-base font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* Minimum Price */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <h3 className="mt-2 text-xl font-bold text-green-600">
                {minimumPrice !== null
                  ? `${banglaNumber(minimumPrice)} টাকা`
                  : "তথ্য নেই"}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                বাজারভিত্তিক সর্বনিম্ন
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <h3 className="mt-2 text-xl font-bold text-red-600">
                {maximumPrice !== null
                  ? `${banglaNumber(maximumPrice)} টাকা`
                  : "তথ্য নেই"}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                বাজারভিত্তিক সর্বোচ্চ
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500">
                গড় দাম
              </p>

              <h3 className="mt-2 text-xl font-bold text-green-700">
                {averagePrice !== null
                  ? `${banglaNumber(averagePrice)} টাকা`
                  : "তথ্য নেই"}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {getUnit(product.unit)} গড় দাম
              </p>
            </div>

          </div>

          {/* Market Table Heading */}
          <h2 className="mb-4 mt-7 text-base font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {/* Responsive Market Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">

            <table className="w-full min-w-[600px] border-collapse text-left text-sm">

              <thead className="bg-[#f7faf7] text-gray-600">
                <tr>
                  <th className="px-4 py-4 font-semibold">
                    বাজার
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    বিভাগ
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-4 text-right font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.length > 0 ? (
                  markets.map((item, index) => {
                    const marketAverage =
                      (item.min + item.max) / 2;

                    return (
                      <tr
                        key={`${item.market}-${index}`}
                        className={`border-t border-gray-200 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-[#f3f8f4]"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {item.market}
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {item.division}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {banglaNumber(item.min)} টাকা
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {banglaNumber(item.max)} টাকা
                        </td>

                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          {banglaNumber(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>

        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:underline"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>

      </section>
    </main>
  );
}