export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Heading Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-40 rounded-lg bg-gray-200" />

          <div className="mt-4 h-4 w-52 rounded bg-gray-200" />
        </div>

        {/* Sorting Skeleton */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="h-5 w-36 rounded bg-gray-200" />

          <div className="h-9 w-40 rounded-lg bg-gray-200" />
        </div>

        {/* Product Card Skeletons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-6 w-28 rounded bg-gray-200" />
                </div>

                <div className="h-7 w-14 rounded-md bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}