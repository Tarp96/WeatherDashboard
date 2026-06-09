import { WeatherOverview } from "../components/WeatherOverview";

export const HomePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Weather Dashboard</h1>
      <div>
        <h2>Favorites</h2>
      </div>
      <div>
        <WeatherOverview />
      </div>
    </>
  );
};
