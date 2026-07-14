import { getItem, setItem } from "./LocalStorage";

const FAVORITES_KEY = "favoriteCities";
const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

function getCities(storageKey: string): string[] {
  return getItem<string[]>(storageKey) ?? [];
}

function addCity(storageKey: string, city: string): void {
  const cities = getCities(storageKey);

  if (cities.includes(city)) return;

  setItem(storageKey, [...cities, city]);
}

function removeCity(storageKey: string, city: string): void {
  const cities = getCities(storageKey);

  const updatedCities = cities.filter((storedCity) => storedCity !== city);

  setItem(storageKey, updatedCities);
}

export function getFavoriteCities(): string[] {
  return getCities(FAVORITES_KEY);
}

export function addCityToFavorites(city: string): void {
  addCity(FAVORITES_KEY, city);
}

export function removeCityFromFavorites(city: string): void {
  removeCity(FAVORITES_KEY, city);
}

export function getRecentSearches(): string[] {
  return getCities(RECENT_SEARCHES_KEY);
}

export function addCityToRecentSearches(city: string): void {
  const recentSearches = getRecentSearches();

  const updatedRecentSearches = [
    city,
    ...recentSearches.filter(
      (recentCity) => recentCity.toLowerCase() !== city.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_SEARCHES);

  setItem(RECENT_SEARCHES_KEY, updatedRecentSearches);
}

export function removeCityFromRecentSearches(city: string): void {
  removeCity(RECENT_SEARCHES_KEY, city);
}
