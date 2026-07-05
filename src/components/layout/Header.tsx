import { useState } from "react";

export const Header = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <>
      <h2>WeatherDB</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: London"
      ></input>
    </>
  );
};
