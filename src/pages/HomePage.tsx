import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState, useCallback } from "react";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (city: string) => {
    setSelectedCity(city);
    setUseCurrentLocation(false);
  };

  const handleLocationFallback = useCallback(() => {
    const randomCityList = [
      "Oslo",
      "Berlin",
      "Tokyo",
      "London",
      "New York",
      "Mexico City",
      "Roma",
    ];

    const randomCity = Math.floor(Math.random() * randomCityList.length);

    setSelectedCity(randomCityList[randomCity]);
    setUseCurrentLocation(false);
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-sky-50 to-blue-100">
        <Header onSearch={handleSearch} isSearching={isSearching} />

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
