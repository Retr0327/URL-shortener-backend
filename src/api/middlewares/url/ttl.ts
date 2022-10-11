import { URL } from 'types';
import { prisma } from '@models';
import { Middleware } from '@koa/router';

type Request = Pick<URL, 'shortURL'>;

const checkTTL = (): Middleware => async (ctx, next) => {
  const { shortURL } = ctx.request.body as Request;
  const result = await prisma.shortUrls.findUnique({ where: { shortURL } });

  if (result === null) {
    ctx.status = 200;
    ctx.body = { status: 'success', message: 'Expired' };
    return;
  }

  await next();
};

export default checkTTL;
