import { CityWeatherData } from "../../types/Weather";
import { timeStampConverter } from "../../utils/helpers/TimeStampConverter";
import { Gauge, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import { WeatherInfoCard } from "./WeatherInfoCard";

interface WeatherDetailsProps {
  data: CityWeatherData;
}

export const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const weatherData = data?.weather;
  const detailsData = weatherData?.data[0];

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h2>Details</h2>
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
            size="compact"
            variant="light"
          />

          <WeatherInfoCard
            icon={Gauge}
            value={`${detailsData?.pressure} hPa`}
            label="Pressure"
            size="compact"
            variant="light"
          />

          <WeatherInfoCard
            icon={Thermometer}
            value={`${detailsData?.feels_like}°C`}
            label="Feels like"
            size="compact"
            variant="light"
          />

          <WeatherInfoCard
            icon={Sun}
            value={detailsData?.uvi ?? 0}
            label="UV Index"
            size="compact"
            variant="light"
          />
        </div>
      </div>
    </>
  );
};
