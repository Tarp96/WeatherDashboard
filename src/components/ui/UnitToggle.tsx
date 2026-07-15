import { Unit } from "../../types/Weather";

interface UnitToggleProps {
  unit: Unit;
  onToggle: (unit: Unit) => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onToggle("metric")}
        className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
          unit === "metric"
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        °C
      </button>

      <button
        type="button"
        onClick={() => onToggle("imperial")}
        className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
          unit === "imperial"
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        °F
      </button>
    </div>
  );
};
