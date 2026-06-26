export function timeStampConverter(
  epochSeconds: number,
  timezoneOffset: number,
) {
  const localTime = new Date((epochSeconds + timezoneOffset) * 1000);

  return localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}