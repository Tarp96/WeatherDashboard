import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";
import { WeatherDetails } from "./WeatherDetails";
import { useQuery } from "@tanstack/react-query";
import { CityWeatherData, FiveDayForecastResponse } from "../../types/Weather";
import {
  getFiveDayForecastData,
  getWeatherDataWithCoordinates,
} from "../../services/api/WeatherService";
import { FiveDayForecastContainer } from "./FiveDayForecastContainer";
import { ErrorMessageCard } from "../state/ErrorMessageCard";
import { WeatherOverviewSkeleton } from "../state/WeatherOverviewSkeleton";
import { NoResultCard } from "../state/NoResultCard";
import { CityNotFoundError } from "../errors/CityNotFoundError";
import { useState, useEffect } from "react";

type WeatherOverviewProps = {
  city: string;
};

export const WeatherOverview = ({ city }: WeatherOverviewProps) => {
  const [geo, setGeo] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setGeo({
            lat: latitude,
            lon: longitude,
          });
        },
        (error) => {
          console.error("Error code = " + error.code);
        },
      );
    } else {
      console.log("Something went wrong");
    }
  }, []);

  const currentWeatherQuery = useQuery<CityWeatherData>({
    queryKey: ["currentWeather", city],
    queryFn: () => getWeatherDataWithCoordinates(city),
  });

  const forecastQuery = useQuery<FiveDayForecastResponse>({
    queryKey: ["forecast", city],
    queryFn: () => getFiveDayForecastData(city),
  });

  if (currentWeatherQuery.isPending || forecastQuery.isPending) {
    return <WeatherOverviewSkeleton />;
  }

  if (
    currentWeatherQuery.error instanceof CityNotFoundError ||
    forecastQuery.error instanceof CityNotFoundError
  ) {
    return <NoResultCard queryString={city} />;
  }

  if (currentWeatherQuery.error || forecastQuery.error) {
    return <ErrorMessageCard />;
  }

  if (!currentWeatherQuery.data || !forecastQuery.data) {
    return null;
  }

  return (
    <div className="mx-auto mt-8 max-w-7xl px-6">
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <CityWeatherDisplay data={currentWeatherQuery.data} />
        <WeatherDetails data={currentWeatherQuery.data} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <TodaysTemperature data={forecastQuery.data} />
        <FiveDayForecastContainer data={forecastQuery.data} />
      </div>
    </div>
  );
};
