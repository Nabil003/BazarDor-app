export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f3] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.5fr_0.5fr]">
            <div>
              <div className="skeleton h-6 w-40 rounded-full" />

              <div className="skeleton mt-5 h-9 w-full max-w-md" />

              <div className="skeleton mt-4 h-4 w-full max-w-xl" />

              <div className="skeleton mt-2 h-4 w-full max-w-lg" />

              <div className="skeleton mt-6 h-11 w-36 rounded-lg" />
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="skeleton h-44 w-44 rounded-2xl" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3">
            <div className="skeleton h-5 w-5 rounded-full" />

            <div className="skeleton h-7 w-40" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-3">
            <div className="skeleton h-5 w-5 rounded-full" />

            <div className="skeleton h-7 w-40" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="skeleton h-14 w-14 shrink-0 rounded-xl" />

        <div className="flex-1">
          <div className="skeleton h-5 w-32" />

          <div className="skeleton mt-2 h-3 w-20" />
        </div>
      </div>

      <div className="skeleton mt-7 h-3 w-20" />

      <div className="mt-3 flex items-center justify-between">
        <div className="skeleton h-6 w-28" />

        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
