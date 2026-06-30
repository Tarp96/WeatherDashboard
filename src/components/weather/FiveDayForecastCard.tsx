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
    <>
      <div>
        <div>
          <p>{mockForecast.date}</p>
          <p>{mockForecast.weatherDescription}</p>
        </div>

        <div>
          <div>
            <p>{mockForecast.lowestTemp}</p>
            <ArrowUp />
          </div>
          <div>
            <p>{mockForecast.highestTemp}</p>
            <ArrowDown />
          </div>
        </div>

        <div>
          <div>
            <p>{mockForecast.humidity}</p>
            <Droplet />
          </div>
          <div>
            <p>{mockForecast.windSpeed}</p>
            <Wind />
          </div>
        </div>
      </div>
    </>
  );
};
