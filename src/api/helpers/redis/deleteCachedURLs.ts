import { redisCli } from "../../models";
import { redisKey } from "../../constants";

async function deleteCachedURLs(shortURL: string) {
  const key = redisKey(shortURL);
  return redisCli.del(key);
}

export default deleteCachedURLs;
