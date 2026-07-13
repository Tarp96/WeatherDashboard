export const getWindDirection = (degrees: number) => {
  const directions = [
    { label: "North", arrow: "↑" },
    { label: "North-East", arrow: "↗" },
    { label: "East", arrow: "→" },
    { label: "South-East", arrow: "↘" },
    { label: "South", arrow: "↓" },
    { label: "South-West", arrow: "↙" },
    { label: "West", arrow: "←" },
    { label: "North-West", arrow: "↖" },
  ];

  return directions[Math.round(degrees / 45) % 8];
};
