export const getWeatherData = async (city: String) => {
    const response = 
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);
    return response.json();
}