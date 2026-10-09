import Link from "next/link";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type ProductCardProps = {
  product: Product;
};

function banglaNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

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

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changeColor = isUp
    ? "text-red-600 bg-red-50"
    : isDown
      ? "text-green-600 bg-green-50"
      : "text-gray-500 bg-gray-100";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
    >
      {/* Product Information */}
      <div className="flex items-center gap-3">
        {/* Product Emoji */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f8f4] text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        {/* Product Name */}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            প্রতি {getUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Price Information */}
      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-lg font-bold text-gray-900">
            {banglaNumber(product.today)} টাকা
          </p>
        </div>

        {/* Price Change Badge */}
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${changeColor}`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {banglaNumber(product.change?.pct ?? 0)}%
        </span>
      </div>
    </Link>
  );
}