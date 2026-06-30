import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

export const FiveDayForecastCard = () => {
  const mockForecast = {
    date: "Sat, Nov 9",
    weatherDescription: "Clear skies",
    lowestTemp: 25,
    highestTemp: 28,
    humidity: 69,
    windSpeed: 2.68,
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {mockForecast.date}
          </p>
          <p className="text-sm text-slate-500">
            {mockForecast.weatherDescription}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-red-400" />
            <span className="font-semibold text-slate-900">
              {mockForecast.highestTemp}°
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-slate-900">
              {mockForecast.lowestTemp}°
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-cyan-400" />
            <span>{mockForecast.humidity}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-400" />
            <span>{mockForecast.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
