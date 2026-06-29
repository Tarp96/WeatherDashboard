import { useQuery } from "@tanstack/react-query";
import { CityWeatherData } from "../../types/Weather";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";
import { timeStampConverter } from "../../utils/helpers/TimeStampConverter";
import { Gauge, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import { WeatherInfoCard } from "./WeatherInfoCard";

export const WeatherDetails = () => {
  const { data, isPending } = useQuery<CityWeatherData>({
    queryKey: ["cityData"],
    queryFn: () => getWeatherDataWithCoordinates("Oslo"),
  });

  if (isPending) return <h2>Details loading...</h2>;

  const weatherData = data?.weather;
  const detailsData = weatherData?.data[0];

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="grid grid-cols-2 gap-3">
          <WeatherInfoCard
            icon={Sunrise}
            value={timeStampConverter(
              detailsData?.sunrise ?? 0,
              weatherData?.timezone_offset ?? 0,
            )}
            label="Sunrise"
            size="compact"
            variant="light"
          />

          <WeatherInfoCard
            icon={Sunset}
            value={timeStampConverter(
              detailsData?.sunset ?? 0,
              weatherData?.timezone_offset ?? 0,
            )}
            label="Sunset"
            size="compact"
            variant="light"
          />

          <WeatherInfoCard
            icon={Wind}
            value={`${detailsData?.wind_speed ?? 0} m/s`}
            label="Wind Speed"
            variant="light"
          />

          <WeatherInfoCard
            icon={Gauge}
            value={`${detailsData?.pressure} hPa`}
            label="Pressure"
            variant="light"
          />

          <WeatherInfoCard
            icon={Thermometer}
            value={`${detailsData?.feels_like}°C`}
            label="Feels like"
            variant="light"
          />

          <WeatherInfoCard
            icon={Sun}
            value={detailsData?.uvi ?? 0}
            label="UV Index"
            variant="light"
          />
        </div>
      </div>
    </>
  );
};
