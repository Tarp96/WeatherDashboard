import { useState, useRef, useEffect } from "react";
import type { SubmitEventHandler } from "react";
import { Search, MapPin, X } from "lucide-react";
import { addCityToRecentSearches } from "../../utils/helpers/CityStorage";
import {
  getRecentSearches,
  removeCityFromRecentSearches,
} from "../../utils/helpers/CityStorage";

type HeaderProps = {
  onSearch: (city: string) => void;
  isSearching: boolean;
  onUseCurrentLocation: () => void;
};

export const Header = ({
  onSearch,
  isSearching,
  onUseCurrentLocation,
}: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] =
    useState<string[]>(getRecentSearches);

  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowRecentSearches(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const city = query.trim();

    if (!city) return;

    onSearch(city);
    addCityToRecentSearches(city);

    setRecentSearches(getRecentSearches());
    setShowRecentSearches(false);
  };

  const handleRecentSearchClick = (city: string) => {
    setQuery(city);
    onSearch(city);

    addCityToRecentSearches(city);
    setRecentSearches(getRecentSearches());
    setShowRecentSearches(false);
  };

  const handleRemoveRecentSearch = (
    e: React.MouseEvent<HTMLButtonElement>,
    city: string,
  ) => {
    e.stopPropagation();

    removeCityFromRecentSearches(city);
    setRecentSearches(getRecentSearches());
  };

  return (
    <header className="border-b border-blue-100 bg-gradient-to-r from-sky-50 to-blue-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-slate-800">
          Weather
          <span className="text-blue-600">DB</span>
        </h1>

        <div className="relative w-full min-w-0 md:w-auto" ref={searchRef}>
          <form
            onSubmit={handleSubmit}
            className="flex w-full min-w-0 items-center gap-2 md:w-auto md:gap-3"
          >
            <div className="relative min-w-0 flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                disabled={isSearching}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city..."
                className="
                w-full
                min-w-0
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
                disabled:cursor-not-allowed
                disabled:opacity-60
                md:w-72
              "
              />
            </div>

            <button
              type="submit"
              className="
              flex
              shrink-0
              cursor-pointer
              items-center
              rounded-xl
              bg-blue-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
              disabled:cursor-not-allowed
              disabled:bg-blue-400
              md:px-5
            "
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
