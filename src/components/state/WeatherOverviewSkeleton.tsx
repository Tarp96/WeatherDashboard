export const WeatherOverviewSkeleton = () => {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-6">
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="h-72 animate-pulse rounded-2xl bg-white/70 shadow-md" />
        <div className="h-72 animate-pulse rounded-2xl bg-white/70 shadow-md" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="h-80 animate-pulse rounded-2xl bg-white/70 shadow-md" />
        <div className="h-80 animate-pulse rounded-2xl bg-white/70 shadow-md" />
      </div>
    </div>
  );
};
