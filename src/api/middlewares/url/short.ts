import { prisma } from '@models';
import { Middleware } from '@koa/router';
import { getCachedURL } from '@utils/redis';

const hasShortURL = (): Middleware => async (ctx, next) => {
  const { shortURL } = ctx.params;
  const cachedResult = await getCachedURL(shortURL);

  if (!Object.keys(cachedResult).length) {
    await next();
    return;
  }

  const updateResult = await prisma.shortUrls.update({
    where: { shortURL },
    data: { totalClick: { increment: 1 } },
  });

  if (updateResult === null) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'cannot add' };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: 'success', fullURL: cachedResult.url };
};

export default hasShortURL;
