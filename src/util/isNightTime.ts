export const isNightTime = () => {
  const currentHour = new Date().getHours();
  return currentHour >= 18 || currentHour < 6;
};
