import { FiveDayForecastResponse } from "../../types/Weather";
import { FiveDayForecastCard } from "./FiveDayForecastCard";
import { formatTime } from "../../utils/helpers/TimeStampConverter";
import { DisplayForecastItems } from "../../types/Weather";

interface FiveDayForecastContainerProps {
  data?: FiveDayForecastResponse;
}

type WeatherSortedByDate = {
  [date: string]: DisplayForecastItems[];
};

export const FiveDayForecastContainer = ({
  data,
}: FiveDayForecastContainerProps) => {
  const foreCastItems = data?.list ?? [];
  const timezoneOffset = data?.city.timezone ?? 0;

  const displayForecastItems = foreCastItems.map((item) => ({
    date: item.dt,
    timezone: timezoneOffset,
    weatherDescription: item.weather[0].description,
    lowestTemp: item.main.temp_min,
    highestTemp: item.main.temp_max,
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
  }));

  const weatherSortedByDate = displayForecastItems.reduce<WeatherSortedByDate>(
    (groups, current) => {
      const date = formatTime(current.date, current.timezone);
      groups[date] ||= [];
      groups[date].push(current);

      return groups;
    },
    {},
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        5-day Forecast
      </h2>

      <div className="flex flex-col gap-4"></div>
    </section>
  );
};
