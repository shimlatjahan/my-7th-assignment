import Hero from "@/components/Hero";
import ProductCard, { type Product } from "@/components/ProductCard";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

// Fetch all products directly from API
async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
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
    console.error("Product Fetch Error:", error);
    return [];
  }
}

export default async function Home() {



  const products = await getProducts();

  // Top 6 products with increased prices
  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 products with decreased prices
  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f3f8f4]">

      {/* Hero Section */}
      <Hero />

      {/* Price Increase Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">

        <div className="flex items-center gap-2 mb-5">
          <span className="text-red-500 text-xs">▲</span>

          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {increasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {increasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

      </section>

      {/* Price Decrease Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">

        <div className="flex items-center gap-2 mb-5">
          <span className="text-green-600 text-xs">▼</span>

          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
        </div>

        {decreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decreasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

      </section>

      {/* All Products Section */}
      <section
        id="সব-পণ্য"
        className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-24"
      >
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
          সব পণ্য
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 mb-5">
          মোট {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

      </section>

    </main>
  );
}