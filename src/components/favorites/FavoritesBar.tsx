import { getFavoriteCities } from "../../utils/helpers/Favorites";
import { useQueries } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";

export const FavoritesBars = () => {
  const favoriteCityList = getFavoriteCities();

  if (favoriteCityList.length <= 0 || favoriteCityList === null)
    return <h2>No favorites added yet</h2>;

  const favoriteQueries = useQueries({
    queries: favoriteCityList.map((city) => ({
      queryKey: ["favorite"],
      queryFn: () => getWeatherDataWithCoordinates(city),
    })),
  });
};
