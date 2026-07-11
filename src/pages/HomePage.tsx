import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState, useEffect } from "react";
import { FavoritesBar } from "../components/favorites/FavoritesBar";
import {
  getFavoriteCities,
  addCityToFavorites,
} from "../utils/helpers/Favorites";

type LocationMode = "featured" | "search" | "current";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [geo, setGeo] = useState<{ lat: number; lon: number } | null>(null);
  const [locationMode, setLocationMode] = useState<LocationMode>("featured");
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() =>
    getFavoriteCities(),
  );

  const fallbackCities = [
    "Oslo",
    "London",
    "Paris",
    "Rome",
    "Berlin",

    "New York",
    "Toronto",
    "Mexico City",
    "Vancouver",

    "Rio de Janeiro",
    "Buenos Aires",
    "Lima",

    "Cape Town",
    "Cairo",
    "Nairobi",

    "Tokyo",
    "Seoul",
    "Bangkok",
    "Singapore",

    "Sydney",
    "Auckland",

    "Dubai",
    "Doha",
    "Reykjavik",
    "Honolulu",
  ];

  useEffect(() => {
    setSelectedCity(getRandomFallbackCity());
    setLocationMode("featured");
  }, []);

  const handleAddToFavorites = (city: string) => {
    addCityToFavorites(city);
    setFavoriteCities(getFavoriteCities());
  };

  const handleSearch = (city: string) => {
    setSelectedCity(city);
    setUseCurrentLocation(false);
    setLocationMode("search");
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSelectedCity(getRandomFallbackCity());
      setUseCurrentLocation(false);
      setLocationMode("featured");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        setUseCurrentLocation(true);
        setLocationMode("current");
      },
      (error) => {
        console.error("Geolocation error:", error);

        setSelectedCity(getRandomFallbackCity());
        setUseCurrentLocation(false);
        setLocationMode("featured");
      },
    );
  };

  const getRandomFallbackCity = () => {
    const randomIndex = Math.floor(Math.random() * fallbackCities.length);
    return fallbackCities[randomIndex];
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-sky-50 to-blue-100">
        <Header
          onSearch={handleSearch}
          isSearching={isSearching}
          onUseCurrentLocation={handleUseCurrentLocation}
        />

        <main className="flex-1">
          <FavoritesBar />
          <WeatherOverview
            city={selectedCity}
            useCurrentLocation={useCurrentLocation}
            onSearchingChange={setIsSearching}
            geo={geo}
            isFeaturedCity={locationMode === "featured"}
            onAddFavorite={handleAddToFavorites}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};
