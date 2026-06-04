import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "./services/api/WeatherService";

function App() {
  const { data, isPending } = useQuery({
    queryKey: ["cityData"],
    queryFn: () => getWeatherData("London"),
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Weather Dashboard</h1>
      <p>{isPending ? <h2>Loading data....</h2> : JSON.stringify(data)}</p>
    </>
  );
}

export default App;
