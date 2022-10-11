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
  const { shortURL } = ctx.request.body as Request;
  await Promise.all([removeCachedURL(shortURL), prisma.shortUrls.delete({ where: { shortURL } })]);

  ctx.status = 202;
  ctx.body = { status: 'success' };
};

export default handleDeleteShortURL;
