import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState } from "react";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (city: string) => {
    setSelectedCity(city);
    setUseCurrentLocation(false);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-sky-50 to-blue-100">
        <Header onSearch={handleSearch} isSearching={isSearching} />

        <main className="flex-1">
          <WeatherOverview
            city={selectedCity}
            useCurrentLocation={useCurrentLocation}
            onSearchingChange={setIsSearching}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};
