import { CityNotFoundError } from "../../components/errors/CityNotFoundError";

export const getWeatherData = async (lat: number, lon: number) => {
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

export const getCityWithCoordinates = async (lat: number, lon: number) => {
  const response = await fetch(`
    http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit={limit}&appid=${import.meta.env.VITE_API_KEY}
    `);

  if (!response.ok) {
    throw new Error("Failed to fetch city name");
  }
  return response.json();
};

export const getWeatherDataWithCoordinates = async (city: string) => {
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

export const getFiveDayForecastData = async (city: string) => {
  const geoData = await getCoordinatesByCity(city);

  if (!geoData.length) {
    throw new CityNotFoundError(city);
  }

  const { lat, lon } = geoData[0];
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const forecastData = await response.json();
  return forecastData;
};
