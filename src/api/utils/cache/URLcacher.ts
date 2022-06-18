import { redisCli } from "@models";
import { generateRedisKey } from "@utils";

async function cacheURL(
  id: string,
  url: string,
  shortURL: string,
  expire: number | null = null
) {
  if (expire == null) {
    expire = 86400; // one day
  }

  expire = Math.ceil(expire);
  const key = generateRedisKey(shortURL);

  redisCli.multi().hset(key, { id, url }).expire(key, expire).exec();
}

export default cacheURL;
