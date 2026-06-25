import { useQuery } from "@tanstack/react-query";
import { FiveDayForecastResponse } from "../../types/Weather";
import { getFiveDayForecastData } from "../../services/api/WeatherService";

export const WeatherDetails = () => {
  const { data, isPending } = useQuery<FiveDayForecastResponse>({
    queryKey: ["fiveDayForecastData"],
    queryFn: () => getFiveDayForecastData("Oslo"),
  });

  if (isPending) <h2>Details loading...</h2>;

  const detailsData = data?.list[0];

  return (
    <>
      <div></div>
    </>
  );
};
