import Redis from 'ioredis-mock';
import { hsetURL, getCachedURL, removeCachedURL } from '@utils/redis';

let redis: any;
let id: string;
let longURL: string;
let shortURL: string;
let expire: number;

beforeAll(() => {
  redis = new Redis();
  id = '1';
  longURL = 'https://www.google.com';
  shortURL = 'abcde';
  expire = 3600;
});

jest.setMock('ioredis', redis);

afterEach((done) => {
  new Redis().flushall().then(() => done());
});

describe('Test utils/cache', () => {
  describe('Test utils/cacheURL', () => {
    test("should return { id: '1', url: 'https://www.google.com' }", async () => {
      await hsetURL(id, longURL, shortURL, expire);
      const result = await getCachedURL(shortURL);
      const actual = { id: '1', url: 'https://www.google.com' };

      expect(result).toMatchObject(actual);
    });
  });

  describe('Test utils/removeCachedURL', () => {
    test('should return {}', async () => {
      await removeCachedURL(shortURL);
      const result = await getCachedURL(shortURL);

      expect(result).toMatchObject({});
    });
  });
});
