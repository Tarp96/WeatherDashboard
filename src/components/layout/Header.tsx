import { useState } from "react";

export const Header = () => {
  const [query, setQuery] = useState("");

  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          WeatherDB
        </h1>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="
            w-72
            rounded-xl
            border
            border-white/20
            bg-white/10
            px-4
            py-2
            text-white
            placeholder:text-blue-100/70
            outline-none
            transition
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-400/30
          "
        />
      </div>
    </header>
  );
};
