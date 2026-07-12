import { useQueries } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";
import { FavoriteCityCard } from "./FavoriteCityCard";

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
    queries: favoriteCityList.map((city) => ({
      queryKey: ["favorite", city],
      queryFn: () => getWeatherDataWithCoordinates(city),
    })),
  });

  if (favoriteCityList.length === 0) {
    return <h2>No favorites added yet</h2>;
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
        Favorite Cities
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">{displayFavorites}</div>
    </section>
  );
};
