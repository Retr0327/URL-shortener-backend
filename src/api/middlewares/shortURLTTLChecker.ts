import { Next } from "koa";
import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const checkShortURLTTL = async (ctx: RouterContext, next: Next) => {
  const { shortURL } = ctx.request.body;
  const result = await shortUrls.findUnique({ where: { shortURL } });

  if (result == null) {
    ctx.status = 200;
    ctx.body = { status: "success", message: "Expired" };
    return;
  }

  await next();
};

export default checkShortURLTTL;
