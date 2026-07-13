import { AirPollutionResponse, CityWeatherData } from "../../types/Weather";
import { timeStampConverter } from "../../utils/helpers/TimeStampConverter";
import { Gauge, Sun, Sunrise, Sunset, Fan, Navigation } from "lucide-react";
import { WeatherInfoCard } from "../ui/WeatherInfoCard";
import { DashboardCard } from "../ui/DashboardCard";
import { airQualityMap } from "../../utils/helpers/AirQualityMap";
import { getWindDirection } from "./../../utils/helpers/GetWindDirection";

interface WeatherDetailsProps {
  data: CityWeatherData;
  airPollutionData: AirPollutionResponse;
}

export const WeatherDetails = ({
  data,
  airPollutionData,
}: WeatherDetailsProps) => {
  const weatherData = data?.weather;
  const detailsData = weatherData?.data[0];
  const airQuality = airQualityMap[airPollutionData.list[0].main.aqi];
  const windDirection = getWindDirection(data.weather.data[0].wind_deg);

  return (
    <DashboardCard>
      <div className="flex h-full flex-col">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Details</h2>
        <div className="grid flex-1 grid-cols-2 gap-5">
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
            icon={Fan}
            value={
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${airQuality.color}`} />
                <span>{airQuality.label}</span>
              </div>
            }
            label="Air Quality"
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
            icon={Navigation}
            value={`${windDirection.arrow} ${windDirection.label}`}
            label="Wind Direction"
            size="compact"
            variant="light"
            iconStyle={{
              transform: `rotate(${data.weather.data[0].wind_deg}deg)`,
            }}
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
    </DashboardCard>
  );
};
