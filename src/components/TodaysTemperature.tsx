import { getFiveDayForecastData } from "../services/api/WeatherService";
import { useQuery } from "@tanstack/react-query";
import { FiveDayForecastResponse } from "../types/Weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const TodaysTemperature = () => {
  const { data, isPending } = useQuery<FiveDayForecastResponse>({
    queryKey: ["fiveDayForecastData"],
    queryFn: () => getFiveDayForecastData("Oslo"),
  });

  if (isPending) return <h2>Data Loading</h2>;

  const forecastData = data?.list;
  const firstForecast = forecastData?.[0];

  const dailyTemperature = forecastData?.slice(0, 8);

  const chartData = dailyTemperature?.map((forecast) => ({
    time: forecast.dt_txt.split(" ")[1].slice(0, 5),
    temp: Math.round(forecast.main.temp),
  }));

  return (
    <>
      <h2>Today's Temperature</h2>
      <div className="h-72 rounded-2xl bg-white/10 p-4">
        <h2 className="mb-4 text-xl font-semibold">24 Hour Forecast</h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
