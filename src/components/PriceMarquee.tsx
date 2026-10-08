"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

type Product = {
  id: number;
  nameBn: string;
  image: string;
  categoryIcon: string;
  today: number;
  yesterday: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

// English Number → Bangla Number
function banglaNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

export default function PriceMarquee() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        console.log("Products API:", result);

        // Handle API response
        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.products)
              ? result.products
              : Array.isArray(result.data?.products)
                ? result.data.products
                : [];

        setProducts(productList.slice(0, 12));
      } catch (error) {
        console.error("Marquee Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f5faf6] py-2 text-center text-xs text-gray-500">
        বাজারদর লোড হচ্ছে...
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-b border-green-100 bg-[#f5faf6] py-2">

      <Marquee
        speed={35}
        gradient={false}
        pauseOnHover={true}
        autoFill={true}
        direction="left"
      >
        {products.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          return (
            <div
              key={product.id}
              className="mr-7 flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] sm:text-xs"
            >

              {/* Product Emoji */}
              <span className="text-xs">
                {product.image || product.categoryIcon || "🛒"}
              </span>

              {/* Product Name */}
              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>

              {/* Current Price */}
              <span className="text-gray-700">
                {banglaNumber(product.today)} টাকা/{product.unit}
              </span>

              {/* Price Change */}
              <span
                className={`font-semibold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {banglaNumber(product.change?.pct ?? 0)}%
              </span>

            </div>
          );
        })}
      </Marquee>

    </div>
  );
}