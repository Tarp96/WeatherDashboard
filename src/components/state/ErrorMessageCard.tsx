import { AlertTriangle } from "lucide-react";

export const ErrorMessageCard = () => {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-red-200 bg-white p-10 text-center shadow-md">
      <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />

      <h2 className="text-2xl font-semibold text-slate-800">
        Unable to load weather data
      </h2>

      <p className="mt-2 text-slate-600">
        We couldn't retrieve weather information right now.
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Please check the city name or try again in a moment.
      </p>
    </div>
  );
};
