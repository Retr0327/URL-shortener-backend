import { URL } from 'types';
import { prisma } from '@models';
import { Middleware } from '@koa/router';

type Request = Pick<URL, 'url' | 'expireDate'>;

const hasLongURL = (): Middleware => async (ctx, next) => {
  const { url } = ctx.request.body as Request;

  const result = await prisma.shortUrls.findUnique({
    where: { fullURL: url },
    select: { id: true, shortURL: true },
  });

  if (result === null) {
    await next();
    return;
  }

  const { id, shortURL } = result;
  ctx.status = 200;
  ctx.body = { status: 'success', data: { id, shortURL }, msg: 'exists' };
};

export default hasLongURL;
