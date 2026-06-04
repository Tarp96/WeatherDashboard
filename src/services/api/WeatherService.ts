export const getWeatherData = async (city: string) => {
    const response = 
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);
    console.log(response.json())
    return response.json();
}

