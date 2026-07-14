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
                onFocus={() => {
                  if (!isSearching) {
                    setShowRecentSearches(true);
                  }
                }}
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
              {showRecentSearches && recentSearches.length > 0 && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-[288px] sm:w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  <div className="border-b border-slate-100 px-3 py-2 sm:px-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Recent searches
                    </p>
                  </div>

                  <ul className="py-1">
                    {recentSearches.map((city) => (
                      <li
                        key={city}
                        className="group flex w-full min-w-0 items-center py-1 transition hover:bg-blue-50 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => handleRecentSearchClick(city)}
                          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 transition group-hover:text-blue-700 
                       max-[410px]:px-2 max-[410px]:gap-1.5 max-[410px]:pr-1"
                        >
                          <Search className="h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-blue-500" />

                          <span className="min-w-0 flex-1 truncate font-medium">
                            {city}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleRemoveRecentSearch(e, city)}
                          aria-label={`Remove ${city} from recent searches`}
                          className="mr-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500 active:bg-red-100
                       max-[410px]:mr-0 max-[410px]:-mr-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="
    flex items-center gap-2
    cursor-pointer
    rounded-xl
    bg-blue-600
    px-5
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
  "
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>
          <button
            type="button"
            onClick={onUseCurrentLocation}
            className="group flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-blue-200 hover:bg-white/60 hover:text-blue-700"
          >
            <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="underline underline-offset-4">
              Current Location
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
