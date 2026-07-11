type FavoriteCityCardProps = {
  city: string;
  country: string;
  temp: number;
  highestTemp: number;
  lowestTemp: number;
};

export const FavoriteCityCard = ({
  city,
  country,
  temp,
  highestTemp,
  lowestTemp,
}: FavoriteCityCardProps) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:shadow-lg">
      <header>
        <h3 className="text-lg font-semibold text-slate-800">{city}</h3>
        <p className="text-sm text-slate-500">{country}</p>
      </header>

      <section className="my-6">
        <p className="text-4xl font-bold text-slate-800">{temp}°</p>
      </section>

      <footer className="flex justify-between text-sm text-slate-600">
        <span>H: {highestTemp}°</span>
        <span>L: {lowestTemp}°</span>
      </footer>
    </article>
  );
};
