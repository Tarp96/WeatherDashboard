import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { firstLetterUpperCase } from "../../utils/helpers/HelperFunctions";

interface FiveDayForecastCardProps {
  date: number | string;
  weatherDescription: string;
  lowestTemp: number;
  highestTemp: number;
  humidity: number;
  windSpeed: number;
}

export const FiveDayForecastCard = ({
  date,
  weatherDescription,
  lowestTemp,
  highestTemp,
  humidity,
  windSpeed,
}: FiveDayForecastCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-[110px]">
          <p className="text-sm font-semibold leading-tight text-slate-900">
            {date}
          </p>

          <p className="mt-1 text-xs text-slate-500 capitalize">
            {weatherDescription}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-red-400" />
            <span className="font-semibold text-slate-900">{highestTemp}°</span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-slate-900">{lowestTemp}°</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-cyan-400" />
            <span>{humidity}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-400" />
            <span>{windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
