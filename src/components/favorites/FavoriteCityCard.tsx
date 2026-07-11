type FavoriteCityCardProps = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  icon: string;
};

export const FavoriteCityCard = ({
  city,
  country,
  temp,
  feelsLike,
  icon,
}: FavoriteCityCardProps) => {
  return (
    <article className="flex w-64 items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
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
    </article>
  );
};
