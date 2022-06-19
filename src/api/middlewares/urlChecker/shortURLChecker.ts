import { Next } from "koa";
import { getCachedURL } from "@utils";
import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const checkShortURLExists = async (ctx: RouterContext, next: Next) => {
  const { shortURL } = ctx.params;
  const cachedResult = await getCachedURL(shortURL);

  if (!Object.keys(cachedResult).length) {
    await next();
    return;
  }

  const updateResult = await shortUrls.update({
    where: { shortURL },
    data: { totalClick: { increment: 1 } },
  });

  if (updateResult == null) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot add" };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: "success", fullURL: cachedResult.url };
};

export default checkShortURLExists;
