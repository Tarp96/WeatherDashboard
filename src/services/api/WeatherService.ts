export const getLongLat = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }

  return response.json();
};

export const getWeatherDataWithCoordinates = async (city: string) => {
  const geoData = await getLongLat(city);

  if (!geoData.length) {
    throw new Error("City not found");
  }

  const { lat, lon } = geoData[0];

  const response = await fetch(
    `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const weatherData = await response.json();

  return {
    city: geoData[0].name,
    country: geoData[0].country,
    state: geoData[0].state,
    weather: weatherData,
  };
};



