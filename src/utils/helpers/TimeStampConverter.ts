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

  function formatTime(timestamp: number, timezoneOffset: number = 0): string {
    const localTime = new Date((timestamp + timezoneOffset) * 1000);
    return localTime.toLocaleDateString("en-CA"); 
  }