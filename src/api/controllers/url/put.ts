import { URL } from 'types';
import { Middleware } from 'koa';
import { prisma } from '@models';

type Request = Pick<URL, 'shortURL'>;

const handleIncreaseClick: Middleware = async (ctx) => {
  const { shortURL } = ctx.request.body as Request;

  const result = await prisma.shortUrls.update({
    where: { shortURL },
    data: { totalClick: { increment: 1 } },
    select: { fullURL: true },
  });

  if (result === null) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
    return;
  }

  ctx.status = 201;
  ctx.body = { status: 'success', data: { url: result.fullURL } };
};

export default handleIncreaseClick;
