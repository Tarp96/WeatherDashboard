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

export function formatTime(timestamp: number, timezoneOffset: number = 0): string {
    const localTime = new Date((timestamp + timezoneOffset) * 1000);
    return localTime.toLocaleDateString("en-CA"); 
}

export function formatToReadable(timeStamp: number){
  const displayTime = new Date(timeStamp* 1000).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    })
 return displayTime;
}

export function formatDateKey(dateKey: string){
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

