import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";

export const WeatherOverview = () => {
  return (
    <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-2">
      <div className="flex-1">
        <CityWeatherDisplay />
      </div>

      <div className="lg:w-96">
        <TodaysTemperature />
      </div>
    </div>
  );
};
