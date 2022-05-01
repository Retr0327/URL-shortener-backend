const shortURLTable = "url-shortener";
const redisKey = (shortURL: string) => `shortURL:${shortURL}`;

export { shortURLTable, redisKey };
