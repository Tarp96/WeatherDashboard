import { WeatherOverview } from "../components/weather/WeatherOverview";
import { Header } from "../components/layout/Header";

export const HomePage = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <WeatherOverview />
      </div>
    </>
  );
};
