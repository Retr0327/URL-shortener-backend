import { redisCli } from "../../models";
import { redisKey } from "../../constants";

async function getCachedURL(shortURL: string) {
  const key = redisKey(shortURL);
  return redisCli.hgetall(key);
}

export default getCachedURL;
