export function convertToTodayTime(datetimeStr: string) {
  const date = new Date(datetimeStr);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return datetimeStr ? `${hours}:${minutes}` : '--:--';
}
