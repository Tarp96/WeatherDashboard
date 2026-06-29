import { getFiveDayForecastData } from "../../services/api/WeatherService";
import { useQuery } from "@tanstack/react-query";
import { FiveDayForecastResponse } from "../../types/Weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TodaysTemperatureProps {
  data: FiveDayForecastResponse;
}

export const TodaysTemperature = ({ data }: TodaysTemperatureProps) => {
  const forecastData = data?.list;

  const dailyTemperature = forecastData?.slice(0, 8);

  const chartData = dailyTemperature?.map((forecast) => ({
    time: forecast.dt_txt.split(" ")[1].slice(0, 5),
    temp: Math.round(forecast.main.temp),
  }));

  console.log(chartData);

  const totalTemp = chartData?.reduce((sum, item) => sum + item.temp, 0) ?? 0;
  const averageTemp =
    chartData && chartData.length > 0 ? totalTemp / chartData.length : 0;

  console.log(averageTemp);

  return (
    <section className="h-full min-h-[360px] rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">
          Today&apos;s Temperature
        </p>
        <h2 className="text-2xl font-bold text-slate-900">24 Hour Forecast</h2>
        <p>Average Temperature: {averageTemp}°C</p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              unit="°"
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
