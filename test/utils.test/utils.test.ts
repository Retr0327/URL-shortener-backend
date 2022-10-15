import makeShortURL from '@utils/url';
import getExpireTime from '@utils/expiry';
import { getRedisKey } from '@utils/redis';

describe('Test utils', () => {
  describe('Test utils/generateShortURL', () => {
    test('should return a string with a give length', () => {
      {
        const length = 0;
        const shortURL = makeShortURL(length);
        expect(shortURL).toHaveLength(length);
      }
      {
        const length = 10;
        const shortURL = makeShortURL(length);
        expect(shortURL).toHaveLength(length);
      }
    });
  });

  describe('Test utils/generateRedisKey', () => {
    test('should return a string with the format `shortURL:<shortURL>`', () => {
      const shortURL = 'abcde';
      const key = getRedisKey(shortURL);

      expect(key).toBe('shortURL:abcde');
    });
  });

  describe('Test utils/expireTime', () => {
    test('should return a number less than 86400', () => {
      const getExpireDate = (hour: number) => new Date(Date.now() + hour * 60 * 60 * 1000);
      const oneHour = getExpireDate(1);
      const twoDays = getExpireDate(48);

      expect(getExpireTime(oneHour)).not.toBeNull();
      expect(getExpireTime(twoDays)).toBeNull();
    });
  });
});
