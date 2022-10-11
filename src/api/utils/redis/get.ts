import { redis } from '@models';
import getRedisKey from './key';

async function getCachedURL(shortURL: string) {
  const key = getRedisKey(shortURL);
  return redis.hgetall(key);
}

export default getCachedURL;
