import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { formatWeatherDescription } from "../../utils/helpers/HelperFunctions";
import { Unit } from "../../types/Weather";
import {
  getTemperatureUnit,
  getSpeedUnit,
} from "../../utils/helpers/GetTemperatureUnit";

interface FiveDayForecastCardProps {
  date: number | string;
  weatherDescription: string;
  lowestTemp: number;
  highestTemp: number;
  humidity: number;
  windSpeed: number;
  unit: Unit;
}

export const FiveDayForecastCard = ({
  date,
  weatherDescription,
  lowestTemp,
  highestTemp,
  humidity,
  windSpeed,
  unit,
}: FiveDayForecastCardProps) => {
  const temperatureUnit = getTemperatureUnit(unit);
  const speedUnit = getSpeedUnit(unit);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="min-w-[110px] flex-shrink-0">
            <p className="text-sm font-semibold leading-tight text-slate-900 whitespace-nowrap">
              {date}
            </p>
          </div>

          <p className="text-xs text-slate-500 capitalize leading-tight">
            {formatWeatherDescription(weatherDescription)}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-red-400" />
            <span className="font-semibold text-slate-900">
              {highestTemp}
              {temperatureUnit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-slate-900">
              {lowestTemp}
              {temperatureUnit}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-cyan-400" />
            <span>{humidity}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-400" />
            <span>
              {windSpeed}
              {speedUnit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
