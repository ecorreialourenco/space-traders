export const calculateSecondsLeft = (targetDate: Date) => {
  const targetTime = targetDate.getTime();
  const currentTime = new Date().getTime();
  const difference = targetTime - currentTime;
  return Math.max(0, Math.floor(difference / 1000));
};
