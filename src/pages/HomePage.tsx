import { CityWeatherDisplay } from "../components/CityWeatherDisplay";
import { TodaysTemperature } from "../components/TodaysTemperature";

export const HomePage = () => {
  return (
    <>
      <div>
        <CityWeatherDisplay />
        <TodaysTemperature />
      </div>
    </>
  );
};
