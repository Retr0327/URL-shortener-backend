import { Next } from "koa";
import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";
import { CreatedURLRequestBody } from "types";

const { shortUrls } = new PrismaClient();

const checkLongURLExists = async (ctx: RouterContext, next: Next) => {
  const { url }: CreatedURLRequestBody = ctx.request.body;

  const result = await shortUrls.findMany({
    where: { fullURL: url },
    select: { id: true, shortURL: true },
  });

  if (result == null) {
    await next();
    return;
  }

  const { id, shortURL } = result[0];
  ctx.status = 200;
  ctx.body = { status: "success", id, shortURL, message: "Exists" };
};

export default checkLongURLExists;
