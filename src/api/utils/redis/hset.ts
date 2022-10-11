import { redis } from '@models';
import getRedisKey from './key';

async function hsetURL(id: string, url: string, shortURL: string, expire: number | null = null) {
  let expireStamp = expire;

  if (expireStamp == null) {
    expireStamp = 86400; // one day
  }

  expireStamp = Math.ceil(expireStamp);
  const key = getRedisKey(shortURL);

  redis.multi().hset(key, { id, url }).expire(key, expireStamp).exec();
}

export default hsetURL;
