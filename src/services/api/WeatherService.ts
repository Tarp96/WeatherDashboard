import { CityNotFoundError } from "../../components/errors/CityNotFoundError";
import {
  WeatherApiResponse,
  CityWeatherData,
  AirPollutionResponse,
} from "../../types/Weather";

export const getWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherApiResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

export const getCoordinatesByCity = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }

  return response.json();
};

export const getCityByCoordinates = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city name");
  }

  return response.json();
};

export const getWeatherDataByCoordinates = async (lat: number, lon: number) => {
  const locationData = await getCityByCoordinates(lat, lon);

  if (!locationData.length) {
    throw new Error("Location not found");
  }

  const { name, country, state } = locationData[0];

  const weather = await getWeatherData(lat, lon);

  return {
    city: name,
    country,
    state,
    weather,
  };
};

export const getWeatherDataWithCoordinates = async (
  city: string,
): Promise<CityWeatherData> => {
  const geoData = await getCoordinatesByCity(city);

  if (!geoData.length) {
    throw new CityNotFoundError(city);
  }

  const { lat, lon, name, country, state } = geoData[0];
  const weather = await getWeatherData(lat, lon);

  return {
    city: name,
    country,
    state,
    weather,
  };
};

const fetchFiveDayForecast = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

export const getFiveDayForecastData = async (city: string) => {
  const geoData = await getCoordinatesByCity(city);

  if (!geoData.length) {
    throw new CityNotFoundError(city);
  }

  const { lat, lon } = geoData[0];

  return fetchFiveDayForecast(lat, lon);
};

export const getFiveDayForecastByCoordinates = async (
  lat: number,
  lon: number,
) => {
  return fetchFiveDayForecast(lat, lon);
};

export const getAirPollutionData = async (
  lat: number,
  lon: number,
): Promise<AirPollutionResponse> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Air pollution data");
  }

  return response.json();
};
