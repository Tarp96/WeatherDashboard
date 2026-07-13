export const getWeatherBackground = (weatherId: number, isNight: boolean) => {
  if (isNight) {
    return "from-slate-950 via-indigo-950 to-slate-900";
  }

  if (weatherId >= 200 && weatherId < 300) {
    return "from-slate-700 via-indigo-800 to-slate-900";
  }

  if (weatherId >= 300 && weatherId < 600) {
    return "from-slate-500 via-blue-700 to-slate-800";
  }

  if (weatherId >= 600 && weatherId < 700) {
    return "from-slate-100 via-blue-100 to-white";
  }

  if (weatherId >= 700 && weatherId < 800) {
    return "from-stone-300 via-slate-300 to-slate-400";
  }

  if (weatherId === 800) {
    return "from-sky-300 via-blue-200 to-amber-100";
  }

  return "from-slate-300 via-slate-400 to-blue-300";
};
