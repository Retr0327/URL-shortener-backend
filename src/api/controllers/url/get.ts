import { Middleware } from 'koa';
import { prisma } from '@models';

const handleGetAllShortURLs: Middleware = async (ctx) => {
  const data = await prisma.shortUrls.findMany();

  if (data === null) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: 'success', data };
};

export default handleGetAllShortURLs;
