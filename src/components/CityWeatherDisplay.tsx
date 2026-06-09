import { useQuery } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../services/api/WeatherService";
import { CityWeatherData } from "../types/Weather";
import { Droplets, Wind } from "lucide-react";

export const CityWeatherDisplay = () => {
  const { data, isPending } = useQuery<CityWeatherData>({
    queryKey: ["cityData"],
    queryFn: () => getWeatherDataWithCoordinates("Milano"),
  });

  if (isPending) return <h2>Loading data...</h2>;
  if (!data) return <h2>No data found</h2>;

  const weatherApiResponse = data.weather;
  const currentConditions = weatherApiResponse.data[0];
  const weatherDescription = currentConditions.weather[0];
  console.log(currentConditions);

  return (
    <section className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-800 p-6 text-white shadow-xl md:grid-cols-[2fr_1fr]">
      <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
        <div>
          <h2 className="text-3xl font-bold">
            {data.city}
            {data.state && `, ${data.state}`}
          </h2>

          <p className="mt-1 text-lg text-blue-100">{data.country}</p>
        </div>

        <div className="mt-8 flex items-end gap-3">
          <p className="text-7xl font-bold leading-none">
            {Math.round(currentConditions.temp)}°C
          </p>

          <p className="mb-2 text-sm text-blue-100">
            Feels like {Math.round(currentConditions.feels_like)}°C
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
            <Droplets className="h-10 w-10 text-blue-200" />

            <div>
              <p className="text-sm text-blue-100">Humidity</p>
              <p className="mt-1 text-2xl font-semibold">
                {currentConditions.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
            <Wind className="h-10 w-10 text-blue-200" />

            <div>
              <p className="text-sm text-blue-100">Wind Speed</p>
              <p className="mt-1 text-2xl font-semibold">
                {currentConditions.wind_speed} m/s
              </p>
            </div>
          </div>
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

        <p className="mt-1 text-sm text-blue-100">{weatherDescription.main}</p>
      </div>
    </section>
  );
};
