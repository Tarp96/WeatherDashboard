import { LoaderCircle } from "lucide-react";

export const WeatherOverviewSkeleton = () => {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-6">
      <div className="mb-6 flex items-center justify-center gap-3 text-slate-600">
        <LoaderCircle className="h-6 w-6 animate-spin text-blue-600" />
        <span className="text-sm font-medium">Loading weather data...</span>
      </div>

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
