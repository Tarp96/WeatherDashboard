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
import { useEffect } from "react";
import { Star } from "lucide-react";

type WeatherOverviewProps = {
  city: string;
  useCurrentLocation: boolean;
  onSearchingChange: (loading: boolean) => void;
  geo: { lat: number; lon: number } | null;
  isFeaturedCity: boolean;
  onAddFavorite: (city: string) => void;
  onRemoveFavorite: (city: string) => void;
  favoriteCities: string[];
};

export const WeatherOverview = ({
  city,
  useCurrentLocation,
  onSearchingChange,
  geo,
  isFeaturedCity,
  onAddFavorite,
  onRemoveFavorite,
  favoriteCities,
}: WeatherOverviewProps) => {
  const isFavorite = favoriteCities.includes(city);

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
          onClick={() =>
            isFavorite ? onRemoveFavorite(city) : onAddFavorite(city)
          }
          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
            isFavorite
              ? "border-slate-300 bg-white text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              : "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
          }`}
        >
          <Star
            className={`h-4 w-4 ${
              isFavorite ? "fill-amber-400 text-amber-400" : ""
            }`}
          />

          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
