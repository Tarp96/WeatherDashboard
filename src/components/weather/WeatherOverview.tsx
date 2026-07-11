import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";
import { WeatherDetails } from "./WeatherDetails";
import { useQuery } from "@tanstack/react-query";
import { CityWeatherData, FiveDayForecastResponse } from "../../types/Weather";
import {
  getFiveDayForecastData,
  getWeatherDataWithCoordinates,
  getFiveDayForecastByCoordinates,
  getWeatherDataByCoordinates,
} from "../../services/api/WeatherService";
import { FiveDayForecastContainer } from "./FiveDayForecastContainer";
import { ErrorMessageCard } from "../state/ErrorMessageCard";
import { WeatherOverviewSkeleton } from "../state/WeatherOverviewSkeleton";
import { NoResultCard } from "../state/NoResultCard";
import { CityNotFoundError } from "../errors/CityNotFoundError";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

type WeatherOverviewProps = {
  city: string;
  useCurrentLocation: boolean;
  onSearchingChange: (loading: boolean) => void;
  geo: { lat: number; lon: number } | null;
  isFeaturedCity: boolean;
  onAddFavorite: (city: string) => void;
  favoriteCities: string[];
};

export const WeatherOverview = ({
  city,
  useCurrentLocation,
  onSearchingChange,
  geo,
  isFeaturedCity,
  onAddFavorite,
  favoriteCities,
}: WeatherOverviewProps) => {
  const isFavorites = favoriteCities.includes(city);

  const currentWeatherQuery = useQuery<CityWeatherData>({
    queryKey: useCurrentLocation
      ? ["currentWeather", geo?.lat, geo?.lon]
      : ["currentWeather", city],

    queryFn: () =>
      useCurrentLocation
        ? getWeatherDataByCoordinates(geo!.lat, geo!.lon)
        : getWeatherDataWithCoordinates(city),

    enabled: useCurrentLocation ? !!geo : !!city,
  });

  const forecastQuery = useQuery<FiveDayForecastResponse>({
    queryKey: useCurrentLocation
      ? ["forecast", geo?.lat, geo?.lon]
      : ["forecast", city],

    queryFn: () =>
      useCurrentLocation
        ? getFiveDayForecastByCoordinates(geo!.lat, geo!.lon)
        : getFiveDayForecastData(city),

    enabled: useCurrentLocation ? !!geo : !!city,
  });

  const isSearching = currentWeatherQuery.isPending || forecastQuery.isPending;

  useEffect(() => {
    onSearchingChange(isSearching);
  }, [isSearching, onSearchingChange]);

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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Weather Overview
          </h2>

          <p className="text-sm text-slate-500">
            Current weather and forecast for your selected location.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAddFavorite(city)}
          disabled={isFavorites}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
        >
          <Star className="h-4 w-4" />
          Add to Favorites
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <CityWeatherDisplay
          data={currentWeatherQuery.data}
          isFeaturedCity={isFeaturedCity}
        />
        <WeatherDetails data={currentWeatherQuery.data} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <TodaysTemperature data={forecastQuery.data} />
        <FiveDayForecastContainer data={forecastQuery.data} />
      </div>
    </div>
  );
};
