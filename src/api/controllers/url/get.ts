import { Middleware } from 'koa';
import { prisma } from '@models';

const handleGetAllShortURLs: Middleware = async (ctx) => {
  try {
    const data = await prisma.shortUrls.findMany();

    if (data === null) {
      ctx.status = 500;
      ctx.body = { status: 'failed', msg: 'internal server error' };
      return;
    }

    const removedList: string[] = [];

    data.forEach((value) => {
      const now = new Date();
      const expire = new Date(value.expire);

      if (now > expire) {
        removedList.push(value.shortURL);
      }
    });

    await prisma.shortUrls.deleteMany({
      where: {
        shortURL: { in: removedList },
      },
    });

    ctx.status = 200;
    ctx.body = { status: 'success', data };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
  }
};

export default handleGetAllShortURLs;
