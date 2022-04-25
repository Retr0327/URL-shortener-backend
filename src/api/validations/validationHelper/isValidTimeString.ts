function isValidTimeString(timeString: string) {
  const date = new Date(timeString).toString();

  return date !== "Invalid Date";
}

export default isValidTimeString;
