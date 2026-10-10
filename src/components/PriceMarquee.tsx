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



function banglaNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}



export default function PriceMarquee() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        
        if (!response.ok) {
          if (!controller.signal.aborted) {
            setProducts([]);
          }
          return;
        }

        const result = await response.json();

        // Handle Different API Response Structures
        const productList: Product[] = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.products)
              ? result.products
              : Array.isArray(result?.data?.products)
                ? result.data.products
                : [];

        
        if (!controller.signal.aborted) {
          setProducts(productList.slice(0, 12));
        }
      } catch {
        

        if (!controller.signal.aborted) {
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    // Cleanup
    return () => {
      controller.abort();
    };
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