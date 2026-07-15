import { FiveDayForecastResponse, Unit } from "../../types/Weather";
import { FiveDayForecastCard } from "./FiveDayForecastCard";
import {
  formatTime,
  formatDateKey,
} from "../../utils/helpers/TimeStampConverter";
import { DashboardCard } from "../ui/DashboardCard";

interface FiveDayForecastContainerProps {
  data?: FiveDayForecastResponse;
  unit: Unit;
}

export interface DisplayForecastItems {
  date: number;
  timezone: number;
  weatherDescription: string;
  lowestTemp: number;
  highestTemp: number;
  humidity: number;
  windSpeed: number;
}

type WeatherSortedByDate = {
  [date: string]: DisplayForecastItems[];
};

export const FiveDayForecastContainer = ({
  data,
  unit,
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
      const dateKey = formatTime(current.date, current.timezone);
      groups[dateKey] ||= [];
      groups[dateKey].push(current);

      return groups;
    },
    {},
  );

  const calculatedForcast = Object.entries(weatherSortedByDate).reduce(
    (acc, [dateKey, weatherArr]) => {
      if (weatherArr.length === 0) {
        acc[dateKey] = {
          lowestTemp: 0,
          highestTemp: 0,
          averageHumidity: "0.00",
          averageWindSpeed: "0.00",
          mostCommonDescription: "No data",
        };
        return acc;
      }

      const dayStats = weatherArr.reduce(
        (dayAcc, weatherItem) => ({
          lowestTemp: Math.min(dayAcc.lowestTemp, weatherItem.lowestTemp),
          highestTemp: Math.max(dayAcc.highestTemp, weatherItem.highestTemp),
          sumHumidity: dayAcc.sumHumidity + weatherItem.humidity,
          sumWindSpeed: dayAcc.sumWindSpeed + weatherItem.windSpeed,
          count: dayAcc.count + 1,

          descriptionCount: {
            ...dayAcc.descriptionCount,
            [weatherItem.weatherDescription]:
              (dayAcc.descriptionCount[weatherItem.weatherDescription] || 0) +
              1,
          },
        }),
        {
          lowestTemp: Infinity,
          highestTemp: -Infinity,
          sumHumidity: 0,
          sumWindSpeed: 0,
          count: 0,
          descriptionCount: {} as Record<string, number>,
        },
      );

      const displayDate = formatDateKey(dateKey);

      const mostCommonDescription =
        Object.entries(dayStats.descriptionCount).sort(
          (a, b) => b[1] - a[1],
        )[0]?.[0] || "Unknown";

      acc[dateKey] = {
        dateKey: dateKey,
        displayDate: displayDate,
        lowestTemp: Number(dayStats.lowestTemp.toFixed(2)),
        highestTemp: Number(dayStats.highestTemp.toFixed(2)),
        averageHumidity: dayStats.sumHumidity / dayStats.count,
        averageWindSpeed: dayStats.sumWindSpeed / dayStats.count,
        mostCommonDescription,
      };

      return acc;
    },
    {} as Record<string, any>,
  );

  const displayCards = Object.values(calculatedForcast)
    .slice(1)
    .map((item) => (
      <FiveDayForecastCard
        date={item.displayDate}
        weatherDescription={item.mostCommonDescription}
        lowestTemp={item.lowestTemp}
        highestTemp={item.highestTemp}
        humidity={item.averageHumidity.toFixed(2)}
        windSpeed={item.averageWindSpeed.toFixed(2)}
        unit={unit}
      />
    ));

  return (
    <DashboardCard className="p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        5-day Forecast
      </h2>
      <div className="flex flex-col gap-4">{displayCards}</div>
    </DashboardCard>
  );
};
