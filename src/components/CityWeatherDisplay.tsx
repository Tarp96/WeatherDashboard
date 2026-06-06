import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "../services/api/WeatherService";

export const CityWeatherDisplay = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cityData"],
    queryFn: () => getWeatherData("Milano"),
  });

  if (isPending) return <h2>Loading data...</h2>;

  const weather = data.weather[0];

  return (
    <section className="max-w-md mx-auto mt-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-blue-100">{data.sys.country}</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="h-20 w-20"
        />
      </div>

      <div className="mt-6">
        <p className="text-6xl font-bold">
          {Math.round(data.main.temp - 273.15)}°C
        </p>
        <p className="mt-2 capitalize text-lg text-blue-100">
          {weather.description}
        </p>
      </div>
    </section>
  );
};
