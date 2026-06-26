import { useQuery } from "@tanstack/react-query";
import { CityWeatherData } from "../../types/Weather";
import { getWeatherDataWithCoordinates } from "../../services/api/WeatherService";
import { timeStampConverter } from "../../utils/helpers/TimeStampConverter";
import { Sunrise, Sunset } from "lucide-react";

export const WeatherDetails = () => {
  const { data, isPending } = useQuery<CityWeatherData>({
    queryKey: ["cityData"],
    queryFn: () => getWeatherDataWithCoordinates("Oslo"),
  });

  if (isPending) return <h2>Details loading...</h2>;

  const weatherData = data?.weather;
  const detailsData = weatherData?.data[0];

  return (
    <>
      <div>
        <div>
          <p>Sunrise</p>
          {timeStampConverter(
            detailsData?.sunrise ?? 0,
            weatherData?.timezone_offset ?? 0,
          )}
          <Sunrise />
        </div>

        <div>
          <p>Sunset</p>
          {timeStampConverter(
            detailsData?.sunset ?? 0,
            weatherData?.timezone_offset ?? 0,
          )}
          <Sunset />
        </div>
      </div>
    </>
  );
};
