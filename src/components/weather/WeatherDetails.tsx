import { useQuery } from "@tanstack/react-query";
import { WeatherApiResponse } from "../../types/Weather";
import { getFiveDayForecastData } from "../../services/api/WeatherService";

export const WeatherDetails = () => {
  const { data, isPending } = useQuery<WeatherApiResponse>({
    queryKey: ["cityData"],
    queryFn: () => getFiveDayForecastData("Oslo"),
  });

  if (isPending) <h2>Details loading...</h2>;

  const detailsData = data?.data[0];

  return (
    <>
      <div>
        <p>Sunrise</p>
        {detailsData?.sunrise}
      </div>
    </>
  );
};
