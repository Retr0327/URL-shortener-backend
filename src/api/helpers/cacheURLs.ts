import { redisCli } from "../models";

function getKey(shortUrl: string) {
  return `shortURL:${shortUrl}`;
}

const cacheURLs = async (
  id: string,
  url: string,
  shortUrl: string,
  expire: number | null = null
) => {
  if (expire == null) {
    expire = 86400; // one day
  }

  expire = Math.ceil(expire);
  const key = getKey(shortUrl);

  return Promise.all([
    redisCli.hset(key, [
      ["id", id],
      ["longUrl", url],
    ]),
    redisCli.expire(key, expire),
  ]);
};

export default cacheURLs;
