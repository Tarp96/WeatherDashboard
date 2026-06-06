import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "../services/api/WeatherService";

export const CityWeatherDisplay = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cityData"],
    queryFn: () => getWeatherData("Oslo"),
  });

  if (isPending) return <h2>Loading data...</h2>;

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};
