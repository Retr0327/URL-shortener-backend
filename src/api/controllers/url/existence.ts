import { URL } from 'types';
import { Middleware } from 'koa';
import { prisma } from '@models';

type Request = Pick<URL, 'url'>;

const handleCheckURL: Middleware = async (ctx) => {
  try {
    const { url } = ctx.request.body as Request;

    const result = await prisma.shortUrls.findUnique({
      where: { fullURL: url },
      select: { id: true, shortURL: true, expire: true },
    });

    if (result === null) {
      ctx.status = 200;
      ctx.body = { status: 'success', data: { exist: false } };
      return;
    }

    const expire = new Date(result.expire);
    const now = new Date();

    if (now > expire) {
      await prisma.shortUrls.delete({ where: { shortURL: result.shortURL } });
      ctx.status = 200;
      ctx.body = { status: 'success', data: { exist: false } };
      return;
    }

    ctx.status = 200;
    ctx.body = { status: 'success', data: { exist: true } };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
  }
};

export default handleCheckURL;
