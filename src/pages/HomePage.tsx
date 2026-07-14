import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState, useEffect } from "react";
import { FavoritesBar } from "../components/favorites/FavoritesBar";
import {
  getFavoriteCities,
  addCityToFavorites,
  removeCityFromFavorites,
} from "../utils/helpers/CityStorage";
import { AnimatePresence, motion } from "framer-motion";

type LocationMode = "featured" | "search" | "current";

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

const getRandomFallbackCity = () => {
  const randomIndex = Math.floor(Math.random() * fallbackCities.length);
  return fallbackCities[randomIndex];
};

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>(() =>
    getRandomFallbackCity(),
  );
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [geo, setGeo] = useState<{ lat: number; lon: number } | null>(null);
  const [locationMode, setLocationMode] = useState<LocationMode>("featured");
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() =>
    getFavoriteCities(),
  );
  const [weatherBackground, setWeatherBackground] = useState(
    "from-sky-50 to-blue-100",
  );

  useEffect(() => {
    setSelectedCity(getRandomFallbackCity());
    setLocationMode("featured");
  }, []);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setUseCurrentLocation(false);
    setLocationMode("search");
  };

  const handleAddToFavorites = (city: string) => {
    addCityToFavorites(city);
    setFavoriteCities(getFavoriteCities());
  };

  const handleRemoveFromFavorites = (city: string) => {
    removeCityFromFavorites(city);
    setFavoriteCities(getFavoriteCities());
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

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-br transition-colors duration-700 ${weatherBackground}`}
    >
      <Header
        onSearch={handleSelectCity}
        isSearching={isSearching}
        onUseCurrentLocation={handleUseCurrentLocation}
      />

      <main className="flex-1">
        <FavoritesBar
          favoriteCityList={favoriteCities}
          onRemoveFavorite={handleRemoveFromFavorites}
          onDisplayCity={handleSelectCity}
          selectedCity={selectedCity}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={
              useCurrentLocation && geo
                ? `current-${geo.lat}-${geo.lon}`
                : selectedCity
            }
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <WeatherOverview
              city={selectedCity}
              useCurrentLocation={useCurrentLocation}
              onSearchingChange={setIsSearching}
              geo={geo}
              isFeaturedCity={locationMode === "featured"}
              onAddFavorite={handleAddToFavorites}
              onRemoveFavorite={handleRemoveFromFavorites}
              favoriteCities={favoriteCities}
              onBackgroundChange={setWeatherBackground}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
