import { SearchX } from "lucide-react";

type NoResultCardProps = {
  queryString: string;
};

export const NoResultCard = ({ queryString }: NoResultCardProps) => {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-md">
      <SearchX className="mb-4 h-12 w-12 text-slate-500" />

      <h2 className="text-2xl font-semibold text-slate-800">City not found</h2>

      <p className="mt-2 text-slate-600">
        We couldn't find a city named{" "}
        <span className="font-semibold">"{queryString}"</span>.
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Check the spelling or try searching for another city.
      </p>
    </div>
  );
};
