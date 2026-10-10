import Hero from "@/components/Hero";

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product Icon and Name */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 max-w-full rounded bg-gray-200" />

          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Price Label */}
      <div className="mb-3 h-3 w-20 rounded bg-gray-200" />

      {/* Price and Change Badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-7 w-24 rounded bg-gray-200" />

        <div className="h-7 w-16 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function ProductSectionSkeleton({
  title,
  icon,
  count = 6,
}: {
  title: string;
  icon?: string;
  count?: number;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      {/* Section Heading */}
      <div className="mb-5 flex items-center gap-2">
        {icon && (
          <span className="text-xs text-gray-600">
            {icon}
          </span>
        )}

        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
          {title}
        </h2>
      </div>

      {/* Product Skeleton Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      {/* Home Hero */}
      <Hero />

      {/* Price Increased Products */}
      <ProductSectionSkeleton
        title="আজ দাম বেড়েছে"
        icon="▲"
        count={6}
      />

      {/* Price Decreased Products */}
      <ProductSectionSkeleton
        title="আজ দাম কমেছে"
        icon="▼"
        count={6}
      />

      {/* All Products */}
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-5xl scroll-mt-24 px-4 pb-12 sm:px-6"
      >
        <h2 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
          সব পণ্য
        </h2>

        <p className="mb-5 text-xs text-gray-500 sm:text-sm">
          পণ্য লোড হচ্ছে...
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}