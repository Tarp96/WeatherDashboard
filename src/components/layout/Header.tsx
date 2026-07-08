import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { Search } from "lucide-react";

type HeaderProps = {
  onSearch: (city: string) => void;
  isSearching: boolean;
};

export const Header = ({ onSearch, isSearching }: HeaderProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query.trim());
  };

  return (
    <header className="border-b border-blue-100 bg-gradient-to-r from-sky-50 to-blue-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-3xl font-bold text-slate-800">
          Weather
          <span className="text-blue-600">DB</span>
        </h1>

        <div className="relative">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              disabled={isSearching}
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
      py-2
      pl-10
      pr-4
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
          </form>
        </div>
      </div>
    </header>
  );
};
