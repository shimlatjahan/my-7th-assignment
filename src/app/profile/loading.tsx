export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Page Heading */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-40 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-60 max-w-full rounded bg-gray-200" />
        </div>

        {/* Profile Card */}
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          {/* Avatar and User Info */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="h-24 w-24 shrink-0 rounded-full bg-gray-200" />

            <div className="w-full flex-1 space-y-4">
              <div className="mx-auto h-6 w-48 max-w-full rounded bg-gray-200 sm:mx-0" />

              <div className="mx-auto h-4 w-64 max-w-full rounded bg-gray-200 sm:mx-0" />

              <div className="mx-auto h-4 w-32 rounded bg-gray-200 sm:mx-0" />
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gray-200" />

          {/* Profile Details */}
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200" />

                <div className="h-12 w-full rounded-xl bg-gray-100" />
              </div>
            ))}
          </div>

          {/* Update Button */}
          <div className="mt-8 h-11 w-full rounded-xl bg-gray-200 sm:w-44" />
        </div>
      </section>
    </main>
  );
}