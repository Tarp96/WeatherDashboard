import { useQuery } from "@tanstack/react-query";
import { getWeatherDataWithCoordinates } from "../services/api/WeatherService";

export const CityWeatherDisplay = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cityData"],
    queryFn: () => getWeatherDataWithCoordinates("Milano"),
  });

  if (isPending) return <h2>Loading data...</h2>;

  const weatherApiResponse = data?.weather;
  const currentConditions = weatherApiResponse.data[0];
  console.log(currentConditions);

  return (
    <section className="max-w-md mx-auto mt-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{}</h2>
          <p className="text-blue-100">
            {data?.city} {data?.country}
          </p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${currentConditions.weather[0].icon}@2x.png`}
          alt={"S"}
          className="h-20 w-20"
        />
      </div>

      <div className="mt-6">
        <p className="text-6xl font-bold">
          {Math.round(currentConditions.temp)}°C
        </p>

        <p className="mt-2 capitalize text-lg text-blue-100">
          {currentConditions.description}
        </p>
      </div>
    </section>
  );
};
