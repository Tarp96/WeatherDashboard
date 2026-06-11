import { getFiveDayForecastData } from "../services/api/WeatherService";
import { useQuery } from "@tanstack/react-query";
import { FiveDayForecastResponse } from "../types/Weather";

export const TodaysTemperature = () => {
  const { data, isPending } = useQuery<FiveDayForecastResponse>({
    queryKey: ["fiveDayForecastData"],
    queryFn: () => getFiveDayForecastData("Oslo"),
  });

  if (isPending) return <h2>Data Loading</h2>;

  const forecastData = data?.list;
  console.log(forecastData);

  return (
    <>
      <h2>Today's Temperature</h2>
    </>
  );
};
