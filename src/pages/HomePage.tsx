import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState } from "react";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-sky-50 to-blue-100">
        <Header onSearch={setSelectedCity} />

        <main className="flex-1">
          <WeatherOverview
            city={selectedCity}
            useCurrentLocation={useCurrentLocation}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};
