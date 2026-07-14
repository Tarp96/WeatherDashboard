import { CityWeatherData } from "../../types/Weather";
import { Droplets, Wind } from "lucide-react";
import { WeatherInfoCard } from "../ui/WeatherInfoCard";
import { DashboardCard } from "../ui/DashboardCard";
import { AnimatedWeatherIcon } from "../ui/AnimatedWeatherIcon";

interface CityWeatherDisplayProps {
  data: CityWeatherData;
  isFeaturedCity: boolean;
}

export const CityWeatherDisplay = ({
  data,
  isFeaturedCity,
}: CityWeatherDisplayProps) => {
  const weatherApiResponse = data.weather;
  const currentConditions = weatherApiResponse.data[0];
  const weatherDescription = currentConditions.weather[0];

  return (
    <DashboardCard className="grid h-full grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
      <div className="rounded-2xl bg-gray-50 p-6">
        {isFeaturedCity && (
          <p className="mb-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Featured City
          </p>
        )}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
              {data.city}
              {data.state && `, ${data.state}`}
            </h2>

            <p className="mt-1 text-base sm:text-lg text-gray-500">
              {data.country}
            </p>
          </div>

          <div className="flex items-end gap-2.5">
            <p className="text-5xl sm:text-7xl font-bold tracking-tighter text-gray-900">
              {Math.round(currentConditions.temp)}°C
            </p>

            <p className="mb-1 text-sm sm:text-base text-gray-500">
              Feels like {Math.round(currentConditions.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <WeatherInfoCard
            icon={Droplets}
            label="Humidity"
            value={`${currentConditions.humidity.toString()}%`}
            variant="light"
          />

          <WeatherInfoCard
            icon={Wind}
            label="Wind"
            value={`${currentConditions.wind_speed.toString()}m/s`}
            variant="light"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
        <AnimatedWeatherIcon
          iconCode={weatherDescription.icon}
          weatherId={weatherDescription.id}
          description={weatherDescription.description}
          className="h-32 w-32 object-contain"
        />

        <p className="mt-2 text-xl font-semibold capitalize">
          {weatherDescription.description}
        </p>

        <p className="mt-1 text-sm ">{weatherDescription.main}</p>
      </div>
    </DashboardCard>
  );
};
