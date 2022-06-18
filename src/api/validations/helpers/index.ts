const isValidURL = (url: string) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

function isExpired(timeString: string) {
  const expire = new Date(timeString);
  const now = new Date(new Date().toUTCString());

  return expire < now;
}

function isValidTimeString(timeString: string) {
  const date = new Date(timeString).toString();
  return date !== "Invalid Date";
}

export { isValidURL, isExpired, isValidTimeString };
