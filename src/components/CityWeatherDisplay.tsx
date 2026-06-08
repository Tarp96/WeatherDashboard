import { useQuery } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../services/api/WeatherService";
import { CityWeatherData } from "../types/Weather";

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
    <section className="max-w-md mx-auto mt-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            {data.city}, {data.state} {data.country}
          </h2>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${currentConditions.weather[0].icon}@2x.png`}
          alt={weatherDescription.description}
          className="h-20 w-20"
        />
      </div>

      <div className="mt-6">
        <p className="text-6xl font-bold">
          {Math.round(currentConditions.temp)}°C
        </p>
        <p>Feels like {currentConditions.feels_like}</p>

        <p className="mt-2 capitalize text-lg text-blue-100">
          {weatherDescription.description}
        </p>
      </div>

      <div>
        <div>
          <p>Humidity</p>
          <p>{currentConditions.humidity}</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p>{currentConditions.wind_speed}</p>
        </div>
      </div>
    </section>
  );
};
