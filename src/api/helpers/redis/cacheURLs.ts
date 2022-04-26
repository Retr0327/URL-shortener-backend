import { redisCli } from "../../models";

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
  const key = `shortURL:${shortUrl}`;

  return Promise.all([
    redisCli.hset(key, [
      ["id", id],
      ["longUrl", url],
    ]),
    redisCli.expire(key, expire),
  ]);
};

export default cacheURLs;
