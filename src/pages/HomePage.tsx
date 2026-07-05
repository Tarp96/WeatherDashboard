import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";

export const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-sky-50 to-blue-100">
        <Header />
        <WeatherOverview />
      </div>
    </>
  );
};
