import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "./services/api/WeatherService";

function App() {
  const { data, isPending } = useQuery({
    queryKey: ["cityData"],
    queryFn: () => getWeatherData("London"),
  });

  if (isPending) return <h2>Loading data...</h2>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Weather Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
