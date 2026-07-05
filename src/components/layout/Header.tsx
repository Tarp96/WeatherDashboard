import { useState } from "react";

export const Header = () => {
  const [query, setQuery] = useState("");

  return (
    <header className="border-b border-blue-100 bg-gradient-to-r from-sky-50 to-blue-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-3xl font-bold text-slate-800">
          Weather
          <span className="text-blue-600">DB</span>
        </h1>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="
              w-72
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-2
              text-slate-700
              placeholder:text-gray-400
              shadow-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          />
        </div>
      </div>
    </header>
  );
};
