const getRedisKey = (shortURL: string) => `shortURL:${shortURL}`;

export default getRedisKey;
