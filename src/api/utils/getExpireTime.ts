function getExpireTime(time: Date) {
  const seconds = (new Date(time).getTime() - Date.now()) / 1000;
  const aDay = 86400;

  if (seconds > aDay) {
    return null;
  }
  return seconds;
}

export default getExpireTime;
