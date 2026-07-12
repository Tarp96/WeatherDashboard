import { useQueries } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";
import { FavoriteCityCard } from "./FavoriteCityCard";
import { Star } from "lucide-react";

type FavoritesBarProps = {
  favoriteCityList: string[];
  onRemoveFavorite: (city: string) => void;
  onDisplayCity: (city: string) => void;
  selectedCity: string;
};

export const FavoritesBar = ({
  favoriteCityList,
  onRemoveFavorite,
  onDisplayCity,
  selectedCity,
}: FavoritesBarProps) => {
  const favoriteQueries = useQueries({
    queries: [...favoriteCityList]
      .sort((a, b) => a.localeCompare(b))
      .map((city) => ({
        queryKey: ["favorite", city],
        queryFn: () => getWeatherDataWithCoordinates(city),
      })),
  });

  if (favoriteCityList.length === 0) {
    return (
      <section className="mx-auto mt-6 max-w-7xl px-6">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-sm">
          <div className="flex justify-center">
            <Star className="h-10 w-10 fill-amber-400 text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            No favorite cities yet
          </h2>

          <p className="mt-3 text-slate-600">
            Save your favorite cities for quick access.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Search for a city above and click{" "}
            <span className="font-medium text-amber-600">
              "Add to Favorites"
            </span>{" "}
            to get started.
          </p>
        </div>
      </section>
    );
  }

  const anyLoading = favoriteQueries.some((query) => query.isLoading);

  if (anyLoading) {
    return <h2>Loading.....</h2>;
  }

  const displayFavorites = favoriteQueries.map((query) => {
    if (!query.data) {
      return null;
    }

    const currentWeather = query.data.weather.data[0];

    if (!currentWeather) {
      return null;
    }

    return (
      <FavoriteCityCard
        key={query.data.city}
        city={query.data.city}
        country={query.data.country}
        temp={currentWeather.temp}
        feelsLike={currentWeather.feels_like}
        icon={currentWeather.weather[0].icon}
        onRemoveFavorite={onRemoveFavorite}
        onDisplayCity={onDisplayCity}
        selectedCity={selectedCity}
      />
    );
  });

  return (
    <section className="mx-auto mt-6 max-w-7xl px-6">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Favorite Cities ({favoriteCityList.length})
      </h2>

      <div className="flex gap-4 overflow-x-auto px-1 pt-2 pb-3">
        {displayFavorites}
      </div>
    </section>
  );
};
