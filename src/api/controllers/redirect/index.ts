import { Middleware } from 'koa';
import { prisma } from '@models';

const handleRedirectURL: Middleware = async (ctx) => {
  const { shortURL } = ctx.params;
  const longURLResult = await prisma.shortUrls.findUnique({
    where: { shortURL },
    select: { fullURL: true, expire: true },
  });

  if (longURLResult === null) {
    ctx.status = 200;
    ctx.body = { status: 'success', msg: 'expired' };
    return;
  }

  const expire = new Date(longURLResult.expire);
  const now = new Date();

  if (now > expire) {
    await prisma.shortUrls.delete({ where: { fullURL: longURLResult.fullURL } });
    ctx.status = 200;
    ctx.body = { status: 'success', msg: 'expired' };
    return;
  }

  const updateResult = await prisma.shortUrls.update({
    where: { shortURL },
    data: { totalClick: { increment: 1 } },
    select: { fullURL: true },
  });

  if (updateResult === null) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: 'success', data: { fullURL: updateResult.fullURL } };
};

export default handleRedirectURL;
