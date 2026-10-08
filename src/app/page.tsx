import Hero from "@/components/Hero";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f8f4]">

      {/* Hero Section */}
      <Hero />

      {/* Price Increase Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">

        <div className="flex items-center gap-2 mb-5">
          <FaArrowTrendUp className="text-red-500 text-sm" />

          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {/* Product Cards - Step 3 */}

      </section>

      {/* Price Decrease Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">

        <div className="flex items-center gap-2 mb-5">
          <FaArrowTrendDown className="text-green-600 text-sm" />

          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
        </div>

        {/* Product Cards - Step 3 */}

      </section>

      {/* All Products Section */}
      <section
        id="সব-পণ্য"
        className="max-w-5xl mx-auto px-4 sm:px-6 pb-12"
      >
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
          সব পণ্য
        </h2>

        {/* Product Cards - Step 3 */}

      </section>

    </main>
  );
}