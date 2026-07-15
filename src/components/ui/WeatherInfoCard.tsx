import type { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type WeatherInfoCardSize = "default" | "compact";
type WeatherInfoCardVariant = "dark" | "light";

type WeatherInfoCardProps = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  size?: WeatherInfoCardSize;
  variant?: WeatherInfoCardVariant;
  iconStyle?: React.CSSProperties;
};

export const WeatherInfoCard = ({
  icon: Icon,
  label,
  value,
  size = "default",
  variant = "dark",
  iconStyle,
}: WeatherInfoCardProps) => {
  const isCompact = size === "compact";
  const isLight = variant === "light";

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 rounded-xl border ${
        isLight
          ? "border-gray-200 bg-white shadow-sm"
          : "border-white/20 bg-white/10"
      } ${isCompact ? "p-3" : "p-4 sm:p-5"}`}
    >
      <Icon
        style={iconStyle}
        className={`flex-shrink-0 transition-transform duration-500 ${
          isLight
            ? isCompact
              ? "h-6 w-6 sm:h-7 sm:w-7 text-blue-600"
              : "h-7 w-7 sm:h-8 sm:w-8 text-blue-600"
            : isCompact
              ? "h-6 w-6 sm:h-7 sm:w-7 text-blue-200"
              : "h-8 w-8 sm:h-10 sm:w-10 text-blue-200"
        }`}
      />

      <div className="min-w-0 flex-1">
        <p
          className={`${
            isLight ? "text-gray-600" : "text-blue-100"
          } ${isCompact ? "text-xs" : "text-sm"}`}
        >
          {label}
        </p>

        <div
          className={`mt-0.5 font-semibold truncate ${
            isLight ? "text-gray-900" : "text-white"
          } text-base sm:text-lg md:text-xl`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
