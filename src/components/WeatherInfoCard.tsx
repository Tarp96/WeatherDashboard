import type { LucideIcon } from "lucide-react";

type WeatherInfoCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export const WeatherInfoCard = ({
  icon: Icon,
  label,
  value,
}: WeatherInfoCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
      <Icon className="h-10 w-10 text-blue-200" />

      <div>
        <p className="text-sm text-blue-100">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};
