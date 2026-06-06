import "./App.css";
import { CityWeatherDisplay } from "./components/CityWeatherDisplay";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Weather Dashboard</h1>
      <CityWeatherDisplay />
    </>
  );
}

export default App;
