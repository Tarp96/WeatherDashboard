import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState, useCallback } from "react";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

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

    "McMurdo Station",
  ];

  const handleSearch = (city: string) => {
    setSelectedCity(city);
    setUseCurrentLocation(false);
  };

  const handleUseCurrentLocation = () => {
    setSelectedCity("");
    setUseCurrentLocation(true);
  };

  const handleLocationFallback = useCallback(() => {
    const randomCity = Math.floor(Math.random() * fallbackCities.length);

    setSelectedCity(fallbackCities[randomCity]);
    setUseCurrentLocation(false);
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-sky-50 to-blue-100">
        <Header
          onSearch={handleSearch}
          isSearching={isSearching}
          onUseCurrentLocation={handleUseCurrentLocation}
        />

        <main className="flex-1">
          <WeatherOverview
            city={selectedCity}
            useCurrentLocation={useCurrentLocation}
            onSearchingChange={setIsSearching}
            onLocationFallback={handleLocationFallback}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};
