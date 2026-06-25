import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";

export const WeatherOverview = () => {
  return (
    <div className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-1 gap-6 px-6 lg:grid-cols-[2fr_1fr]">
      <CityWeatherDisplay />

      <TodaysTemperature />
    </div>
  );
};
