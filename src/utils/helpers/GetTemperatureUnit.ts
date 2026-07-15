import type { Unit } from "../../types/Weather";

export const getTemperatureUnit = (unit: Unit) =>
  unit === "metric" ? "°C" : "°F";

export const getSpeedUnit = (unit: Unit) => (unit === "metric" ? "m/s" : "mph");

export const getDistanceUnit = (unit: Unit) =>
  unit === "metric" ? "km" : "mi";
