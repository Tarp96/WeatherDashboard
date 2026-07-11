import { Star } from "lucide-react";

type FavoriteCityCardProps = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  icon: string;
  onRemoveFavorite: (city: string) => void;
  onDisplayCity: (city: string) => void;
};

export const FavoriteCityCard = ({
  city,
  country,
  temp,
  feelsLike,
  icon,
  onRemoveFavorite,
  onDisplayCity,
}: FavoriteCityCardProps) => {
  return (
    <article
      onClick={() => onDisplayCity(city)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDisplayCity(city);
        }
      }}
      className="relative flex w-64 items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex flex-col">
        <header>
          <h3 className="text-lg font-semibold text-slate-800">{city}</h3>
          <p className="text-sm text-slate-500">{country}</p>
        </header>

        <section className="mt-4">
          <p className="text-4xl font-bold text-slate-800">
            {Math.round(temp)}°
          </p>
        </section>

        <footer className="mt-3">
          <p className="text-sm text-slate-500">
            Feels like {Math.round(feelsLike)}°
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
        className="
absolute
right-4
top-4
rounded-full
bg-white/80
p-1.5
text-amber-400
shadow-sm
backdrop-blur
transition
hover:scale-110
hover:bg-white
hover:text-amber-500
focus:outline-none
focus:ring-2
focus:ring-amber-400
focus:ring-offset-2
"
        onClick={(event) => {
          event.stopPropagation();
          onRemoveFavorite(city);
        }}
      >
        <Star className="h-5 w-5 fill-current" />
      </button>
    </article>
  );
};
