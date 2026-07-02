import { FiveDayForecastResponse } from "../../types/Weather";
import { FiveDayForecastCard } from "./FiveDayForecastCard";

interface FiveDayForecastContainerProps {
  data?: FiveDayForecastResponse;
}

export const FiveDayForecastContainer = ({
  data,
}: FiveDayForecastContainerProps) => {
  const foreCastItems = data?.list ?? [];

  const displayForecastItems = foreCastItems.map((item) => ({
    date: item.dt,
    weatherDescription: item.weather[0].description,
    lowestTemp: item.main.temp_min,
    highestTemp: item.main.temp_max,
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
  }));

  console.log(displayForecastItems);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        5-day Forecast
      </h2>

      <div className="flex flex-col gap-4"></div>
    </section>
  );
};
