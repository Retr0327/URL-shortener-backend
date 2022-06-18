const generateRedisKey = (shortURL: string) => `shortURL:${shortURL}`;

export default generateRedisKey;
