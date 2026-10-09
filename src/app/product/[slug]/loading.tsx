export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex animate-pulse items-center gap-2">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>

        {/* Product Header Skeleton */}
        <div className="mb-5 flex animate-pulse flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-6 w-44 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-52 max-w-full rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-28 w-full rounded-xl bg-gray-100 sm:w-36" />
        </div>

        {/* Summary and Market Table Skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

          {/* Summary Title */}
          <div className="mb-4 h-5 w-36 animate-pulse rounded bg-gray-200" />

          {/* Three Summary Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-gray-200 p-4"
              >
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-4 h-7 w-28 rounded bg-gray-200" />
                <div className="mt-3 h-3 w-32 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Market Table Title */}
          <div className="mb-4 mt-7 h-5 w-44 animate-pulse rounded bg-gray-200" />

          {/* Market Table Skeleton */}
          <div className="overflow-hidden rounded-xl border border-gray-200">

            <div className="grid grid-cols-5 gap-3 bg-gray-100 px-4 py-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-4 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
              <div
                key={row}
                className={`grid grid-cols-5 gap-3 border-t border-gray-200 px-4 py-4 ${
                  row % 2 === 0 ? "bg-[#f3f8f4]" : "bg-white"
                }`}
              >
                {[1, 2, 3, 4, 5].map((col) => (
                  <div
                    key={col}
                    className="h-4 animate-pulse rounded bg-gray-200"
                  />
                ))}
              </div>
            ))}

          </div>

        </div>

        {/* Back Link Skeleton */}
        <div className="mt-6 h-5 w-36 animate-pulse rounded bg-gray-200" />

      </section>
    </main>
  );
}