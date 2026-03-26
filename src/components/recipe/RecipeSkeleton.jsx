export default function RecipeSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[92vh] bg-stone-200 relative">
        <div className="absolute bottom-10 left-6 md:left-12 space-y-4">
          <div className="h-4 w-32 bg-stone-300 rounded-full" />
          <div className="h-14 w-3/4 bg-stone-300 rounded-2xl" />
          <div className="h-14 w-1/2 bg-stone-300 rounded-2xl" />
          <div className="flex gap-3 mt-4">
            <div className="h-10 w-28 bg-stone-300 rounded-full" />
            <div className="h-10 w-28 bg-stone-300 rounded-full" />
            <div className="h-10 w-28 bg-stone-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-14 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-2xl bg-stone-100"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 bg-stone-200 rounded-full" />
              <div className="h-3 w-1/2 bg-stone-200 rounded-full" />
            </div>
            <div className="h-7 w-16 bg-stone-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
