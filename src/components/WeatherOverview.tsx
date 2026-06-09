import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";

export const WeatherOverview = () => {
  return (
    <>
      <CityWeatherDisplay />
      <TodaysTemperature />
    </>
  );
};
