import { redisCli } from "@models";
import { generateRedisKey } from "@utils";

async function removeCachedURL(shortURL: string) {
  const key = generateRedisKey(shortURL);
  return redisCli.del(key);
}

export default removeCachedURL;
