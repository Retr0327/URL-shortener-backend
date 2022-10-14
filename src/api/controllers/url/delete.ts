// import { removeCachedURL } from "@utils";
// import { RouterContext } from "@koa/router";
// import { PrismaClient } from "@prisma/client";

// const { shortUrls } = new PrismaClient();
import { URL } from 'types';
import { Middleware } from 'koa';
import { prisma } from '@models';
import { removeCachedURL } from '@utils/redis';

type Request = Pick<URL, 'shortURL'>;

const handleDeleteShortURL: Middleware = async (ctx) => {
  try {
    const { shortURL } = ctx.request.body as Request;
    const result = await prisma.shortUrls.findUnique({
      where: { shortURL },
    });

    if (result == null) {
      ctx.status = 409;
      ctx.body = { status: 'failed', msg: 'no content for deletion' };
      return;
    }

    await Promise.all([
      removeCachedURL(shortURL),
      prisma.shortUrls.delete({ where: { shortURL } }),
    ]);

    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
  }
};

export default handleDeleteShortURL;
