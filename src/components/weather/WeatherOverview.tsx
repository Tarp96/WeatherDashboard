import { CityWeatherDisplay } from "./CityWeatherDisplay";
import { TodaysTemperature } from "./TodaysTemperature";
import { WeatherDetails } from "./WeatherDetails";
import { useQuery } from "@tanstack/react-query";
import { CityWeatherData } from "../../types/Weather";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";

export const WeatherOverview = () => {
  const { data, isPending, error } = useQuery<CityWeatherData>({
    queryKey: ["cityData"],
    queryFn: () => getWeatherDataWithCoordinates("Oslo"),
  });

  if (isPending) return <h2>Loading weather...</h2>;
  if (error) return <h2>Something went wrong</h2>;
  if (!data) return null;

  return (
    <div className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-1 gap-6 px-6 lg:grid-cols-[2fr_1fr]">
      <CityWeatherDisplay data={data} />
      <TodaysTemperature />
      <WeatherDetails data={data} />
    </div>
  );
};
