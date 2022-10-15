import { URL } from 'types';
import { Middleware } from 'koa';
import { prisma } from '@models';

type Request = Pick<URL, 'url'>;

const handleCheckURL: Middleware = async (ctx) => {
  try {
    const { url } = ctx.request.body as Request;

    const result = await prisma.shortUrls.findUnique({
      where: { fullURL: url },
      select: { id: true, shortURL: true },
    });

    if (result !== null) {
      ctx.status = 200;
      ctx.body = { status: 'success', data: { exist: true } };
      return;
    }

    ctx.status = 200;
    ctx.body = { status: 'success', data: { exist: false } };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
  }
};

export default handleCheckURL;
