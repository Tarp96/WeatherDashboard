import { Star, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Unit } from "../../types/Weather";
import { getTemperatureUnit } from "../../utils/helpers/GetTemperatureUnit";

type FavoriteCityCardProps = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  icon: string;
  onRemoveFavorite: (city: string) => void;
  onDisplayCity: (city: string) => void;
  selectedCity: string;
  unit: Unit;
};

export const FavoriteCityCard = ({
  city,
  country,
  temp,
  feelsLike,
  icon,
  onRemoveFavorite,
  onDisplayCity,
  selectedCity,
  unit,
}: FavoriteCityCardProps) => {
  const isHighlighted = city === selectedCity;
  const temperatureUnit = getTemperatureUnit(unit);

  return (
    <motion.article
      onClick={() => onDisplayCity(city)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDisplayCity(city);
        }
      }}
      tabIndex={0}
      className={`relative flex w-[calc(100vw-3rem)] max-w-64 shrink-0 cursor-pointer items-center justify-between rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        isHighlighted
          ? "border-blue-500 shadow-xl ring-2 ring-blue-200"
          : "border-slate-200 shadow-md"
      }`}
    >
      {isHighlighted && (
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
          <MapPin className="h-3.5 w-3.5 fill-current" />
          <span>Viewing</span>
        </div>
      )}

      <div className="flex flex-col">
        <header className={isHighlighted ? "mt-8" : ""}>
          <h3 className="text-lg font-semibold text-slate-800">{city}</h3>
          <p className="text-sm text-slate-500">{country}</p>
        </header>

        <section className="mt-4">
          <p className="text-4xl font-bold text-slate-800">
            {Math.round(temp)}
            {temperatureUnit}
          </p>
        </section>

        <footer className="mt-3">
          <p className="text-sm text-slate-500">
            Feels like {Math.round(feelsLike)}
            {temperatureUnit}
          </p>
        </footer>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt=""
          className="h-20 w-20 object-contain"
        />
      </div>

      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/80 p-1.5 text-amber-400 shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        onClick={(event) => {
          event.stopPropagation();
          onRemoveFavorite(city);
        }}
      >
        <Star className="h-5 w-5 fill-current" />
      </button>
    </motion.article>
  );
};
