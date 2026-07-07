import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState } from "react";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Oslo");

  return (
    <>
      <div className="bg-gradient-to-r from-sky-50 to-blue-100">
        <Header onSearch={setSelectedCity} />
        <WeatherOverview city={selectedCity} />
        <Footer />
      </div>
    </>
  );
};
