export const getLongLat = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
  )
  const data = await response.json();
  return data;
}


export const getWeatherData  = async (city: string) => {
  const geoData = await getLongLat(city);
  const response = await fetch(`
    https://api.openweathermap.org/data/4.0/onecall/current?lat=${geoData.lat}&lon=${geoData.lon}&appid=${import.meta.env.VITE_API_KEY}
    `)
    const data = await response.json();
    return data;
}

