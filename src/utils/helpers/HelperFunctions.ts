export function firstLetterUpperCase(word: string) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
}

export function formatWeatherDescription(description: string){
    const descriptions: Record<string, string> = {
    "overcast clouds": "Overcast",
    "broken clouds": "Broken clouds",
    "scattered clouds": "Scattered",
    "few clouds": "Few clouds",
    "light intensity shower rain": "Light showers",
    "moderate rain": "Rain",
    "heavy intensity rain": "Heavy rain",
  };

  return descriptions[description.toLowerCase()] ?? firstLetterUpperCase(description);
}