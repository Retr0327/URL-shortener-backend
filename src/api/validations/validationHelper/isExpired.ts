function isExpired(timeString: string) {
  const expire = new Date(timeString);
  const now = new Date(new Date().toUTCString());

  return expire < now;
}

export default isExpired;
