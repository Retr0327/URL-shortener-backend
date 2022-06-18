import { redisCli } from "@models";
import { generateRedisKey } from "@utils";

async function getCachedURL(shortURL: string) {
  const key = generateRedisKey(shortURL);
  return redisCli.hgetall(key);
}

export default getCachedURL;
