import { removeCachedURL } from "@utils";
import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const handleDeleteShortURL = async (ctx: RouterContext) => {
  const { shortURL } = ctx.request.body;

  await Promise.all([
    removeCachedURL(shortURL),
    shortUrls.delete({ where: { shortURL } }),
  ]);

  ctx.status = 202;
  ctx.body = { status: "success" };
};

export default handleDeleteShortURL;
