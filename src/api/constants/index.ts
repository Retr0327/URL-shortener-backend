const shortURLTable = "shortened_urls";
const redisKey = (shortURL: string) => `shortURL:${shortURL}`;

export { shortURLTable, redisKey };
