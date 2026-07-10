import { getItem, setItem } from "./LocalStorage";

const FAVORITES_KEY = "favoriteCities";

export function getFavoriteCities() {
  return getItem<string[]>(FAVORITES_KEY) ?? [];
}

export function addCityToFavorites(city: string) {
  const favorites = getFavoriteCities();

  if (!favorites.includes(city)) {
    favorites.push(city);
    setItem(FAVORITES_KEY, favorites);
  }
}

export function removeCityFromFavorites(city: string) {
  const favorites = getFavoriteCities();

  const updatedFavorites = favorites.filter(
    (favoriteCity) => favoriteCity !== city,
  );

  setItem(FAVORITES_KEY, updatedFavorites);
}
