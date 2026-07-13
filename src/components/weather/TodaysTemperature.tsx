import { FiveDayForecastResponse } from "../../types/Weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { DashboardCard } from "../ui/DashboardCard";

interface TodaysTemperatureProps {
  data: FiveDayForecastResponse;
}

export const TodaysTemperature = ({ data }: TodaysTemperatureProps) => {
  const dailyForecast = data.list.slice(0, 8);

  const chartData = dailyForecast.map((forecast) => ({
    time: forecast.dt_txt.split(" ")[1].slice(0, 5),
    temp: Math.round(forecast.main.temp),
    precipitation: Math.round(forecast.pop * 100),
  }));

  const temperatures = chartData.map((forecast) => forecast.temp);

  const minTemp = Math.floor(Math.min(...temperatures)) - 2;
  const maxTemp = Math.ceil(Math.max(...temperatures)) + 2;

  const totalTemp = chartData.reduce((sum, forecast) => sum + forecast.temp, 0);

  const averageTemp =
    chartData.length > 0 ? Math.round(totalTemp / chartData.length) : 0;

  return (
    <DashboardCard className="flex h-full flex-col">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">
          Today&apos;s Weather
        </p>

        <h2 className="text-2xl font-bold text-slate-900">24 Hour Forecast</h2>

        <p className="text-slate-600">Average temperature: {averageTemp}°C</p>
      </div>

      <div className="mt-6 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              yAxisId="temperature"
              domain={[minTemp, maxTemp]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              unit="°"
            />

            <YAxis
              yAxisId="precipitation"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              unit="%"
            />

            <Tooltip
              formatter={(value, name) => {
                if (name === "Temperature") {
                  return [`${value}°C`, name];
                }

                return [`${value}%`, name];
              }}
            />

            <Legend />

            <Line
              yAxisId="temperature"
              type="monotone"
              dataKey="temp"
              name="Temperature"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              yAxisId="precipitation"
              type="monotone"
              dataKey="precipitation"
              name="Precipitation"
              stroke="#0ea5e9"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};
