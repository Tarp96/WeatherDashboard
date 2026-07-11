import { getFavoriteCities } from "../../utils/helpers/Favorites";
import { useQueries } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";
import { FavoriteCityCard } from "./FavoriteCityCard";

export const FavoritesBars = () => {
  const favoriteCityList = getFavoriteCities();

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
      />
    );
  });

  return <ul>{displayFavorites}</ul>;
};
