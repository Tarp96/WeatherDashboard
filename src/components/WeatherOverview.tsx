import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";

export const WeatherOverview = () => {
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-6 px-4 lg:flex-row">
      <div className="flex-1">
        <CityWeatherDisplay />
      </div>

      <div className="lg:w-96">
        <TodaysTemperature />
      </div>
    </div>
  );
};
