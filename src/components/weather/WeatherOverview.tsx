import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";
import { WeatherDetails } from "./WeatherDetails";
import { useQuery } from "@tanstack/react-query";
import { CityWeatherData, FiveDayForecastResponse } from "../../types/Weather";
import {
  getFiveDayForecastData,
  getWeatherDataWithCoordinates,
} from "../../services/api/WeatherService";

export const WeatherOverview = () => {
  const currentWeatherQuery = useQuery<CityWeatherData>({
    queryKey: ["currentWeather"],
    queryFn: () => getWeatherDataWithCoordinates("Oslo"),
  });

  const forecastQuery = useQuery<FiveDayForecastResponse>({
    queryKey: ["forecast"],
    queryFn: () => getFiveDayForecastData("Oslo"),
  });

  if (currentWeatherQuery.isPending || forecastQuery.isPending)
    return <h2>Loading weather...</h2>;
  if (currentWeatherQuery.error || forecastQuery.error)
    return <h2>Something went wrong</h2>;
  if (!currentWeatherQuery.data || !forecastQuery.data) return null;

  return (
    <div className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-1 gap-6 px-6 lg:grid-cols-[2fr_1fr]">
      <CityWeatherDisplay data={currentWeatherQuery.data} />
      <TodaysTemperature data={forecastQuery.data} />
      <WeatherDetails data={currentWeatherQuery.data} />
    </div>
  );
};
