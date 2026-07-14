export interface WeatherTheme {
  background: string;
  headingText: string;
  secondaryText: string;
  footerBackground: string;
  footerText: string;
  linkText: string;
}

export const getWeatherTheme = (
  weatherId: number,
  isNight: boolean,
): WeatherTheme => {
  if (isNight) {
    return {
      background: "from-slate-950 via-indigo-950 to-slate-900",
      headingText: "text-white",
      secondaryText: "text-slate-300",
      footerBackground: "bg-slate-950/50",
      footerText: "text-slate-300",
      linkText: "text-sky-300",
    };
  }

  if (weatherId >= 200 && weatherId < 300) {
    return {
      background: "from-slate-700 via-indigo-800 to-slate-900",
      headingText: "text-white",
      secondaryText: "text-slate-200",
      footerBackground: "bg-slate-900/40",
      footerText: "text-slate-200",
      linkText: "text-blue-600",
    };
  }

  if (weatherId >= 300 && weatherId < 600) {
    return {
      background: "from-slate-500 via-blue-700 to-slate-800",
      headingText: "text-white",
      secondaryText: "text-slate-200",
      footerBackground: "bg-slate-900/30",
      footerText: "text-slate-100",
      linkText: "text-blue-600",
    };
  }

  if (weatherId >= 600 && weatherId < 700) {
    return {
      background: "from-slate-100 via-blue-100 to-white",
      headingText: "text-slate-800",
      secondaryText: "text-slate-500",
      footerBackground: "bg-white/40",
      footerText: "text-slate-600",
      linkText: "text-blue-600",
    };
  }

  if (weatherId >= 700 && weatherId < 800) {
    return {
      background: "from-stone-300 via-slate-300 to-slate-400",
      headingText: "text-slate-900",
      secondaryText: "text-slate-700",
      footerBackground: "bg-white/25",
      footerText: "text-slate-700",
      linkText: "text-blue-600",
    };
  }

  if (weatherId === 800) {
    return {
      background: "from-sky-300 via-blue-200 to-amber-100",
      headingText: "text-slate-800",
      secondaryText: "text-slate-600",
      footerBackground: "bg-white/30",
      footerText: "text-slate-600",
      linkText: "text-blue-600",
    };
  }

  return {
    background: "from-slate-300 via-slate-400 to-blue-300",
    headingText: "text-slate-900",
    secondaryText: "text-slate-700",
    footerBackground: "bg-white/25",
    footerText: "text-slate-700",
    linkText: "text-blue-600",
  };
};
