import { URL } from 'types';
import { Middleware } from 'koa';
import { prisma } from '@models';
import makeShortURL from '@utils/url';
import { hsetURL } from '@utils/redis';
import getExpireTime from '@utils/expire';

type Request = Pick<URL, 'url' | 'expireDate'>;

const handleCreateShortURL: Middleware = async (ctx) => {
  const { url, expireDate } = ctx.request.body as Request;
  const shortURL = makeShortURL(5);
  const expire = new Date(expireDate);

  const urlResult = await prisma.shortUrls.create({
    data: { fullURL: url, shortURL, expire },
    select: { id: true, fullURL: true, shortURL: true },
  });

  if (urlResult === null) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
    return;
  }

  await hsetURL(
    urlResult.id.toString(),
    urlResult.fullURL,
    urlResult.shortURL,
    getExpireTime(expire),
  );

  ctx.status = 201;
  ctx.body = { status: 'success', data: { id: urlResult.id, shortURL: urlResult.shortURL } };
};

export default handleCreateShortURL;
