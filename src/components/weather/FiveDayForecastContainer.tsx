import { FiveDayForecastCard } from "./FiveDayForecastCard";

export const FiveDayForecastContainer = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        5-day Forecast
      </h2>

      <div className="flex flex-col gap-4">
        <FiveDayForecastCard />
      </div>
    </section>
  );
};
