import { redisCli } from "../../models";
import { redisKey } from "../../constants";

async function deleteCachedURL(shortURL: string) {
  const key = redisKey(shortURL);
  return redisCli.del(key);
}

export default deleteCachedURL;
