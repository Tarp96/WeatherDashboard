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
    <div className="flex flex-col gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10">
      <div className="text-center">
        <p className="text-lg font-semibold text-white">{mockForecast.date}</p>

        <p className="text-sm text-blue-200">
          {mockForecast.weatherDescription}
        </p>
      </div>

      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center gap-2">
          <ArrowUp className="h-5 w-5 text-red-300" />
          <span className="text-xl font-semibold">
            {mockForecast.highestTemp}°
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <ArrowDown className="h-5 w-5 text-blue-300" />
          <span className="text-xl font-semibold">
            {mockForecast.lowestTemp}°
          </span>
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center gap-2">
          <Droplet className="h-5 w-5 text-cyan-300" />
          <span>{mockForecast.humidity}%</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Wind className="h-5 w-5 text-slate-300" />
          <span>{mockForecast.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};
