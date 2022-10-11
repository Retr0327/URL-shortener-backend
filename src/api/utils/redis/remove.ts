import { redis } from '@models';
import getRedisKey from './key';

async function removeCachedURL(shortURL: string) {
  const key = getRedisKey(shortURL);
  return redis.del(key);
}

export default removeCachedURL;
