import { CityWeatherData } from "../../types/Weather";
import { Droplets, Wind } from "lucide-react";
import { WeatherInfoCard } from "../ui/WeatherInfoCard";

interface CityWeatherDisplayProps {
  data: CityWeatherData;
}

export const CityWeatherDisplay = ({ data }: CityWeatherDisplayProps) => {
  const weatherApiResponse = data.weather;
  const currentConditions = weatherApiResponse.data[0];
  const weatherDescription = currentConditions.weather[0];

  return (
    <section className="grid h-full grid-cols-1 gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:grid-cols-[2fr_1fr]">
      {" "}
      <div className="rounded-2xl bg-gray-50 p-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {data.city}
            {data.state && `, ${data.state}`}
          </h2>

          <p className="mt-1 text-lg text-gray-500">{data.country}</p>
        </div>

        <div className="mt-8 flex items-end gap-3">
          <p className="text-7xl font-bold tracking-tight text-gray-900">
            {Math.round(currentConditions.temp)}°C
          </p>

          <p className="mb-2 text-sm text-gray-500">
            Feels like {Math.round(currentConditions.feels_like)}°C
          </p>
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
        <img
          src={`https://openweathermap.org/img/wn/${currentConditions.weather[0].icon}@2x.png`}
          alt={weatherDescription.description}
          className="h-32 w-32"
        />

        <p className="mt-2 text-xl font-semibold capitalize">
          {weatherDescription.description}
        </p>

        <p className="mt-1 text-sm ">{weatherDescription.main}</p>
      </div>
    </section>
  );
};
