import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const handleRedirectURL = async (ctx: RouterContext) => {
  const { shortURL } = ctx.params;
  const longURLResult = await shortUrls.findUnique({
    where: { shortURL },
    select: { fullURL: true },
  });

  if (longURLResult == null) {
    ctx.status = 200;
    ctx.body = { status: "success", message: "Expired" };
    return;
  }

  const updateResult = await shortUrls.update({
    where: { shortURL },
    data: { totalClick: { increment: 1 } },
    select: { fullURL: true },
  });

  if (updateResult == null) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot add" };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: "success", fullURL: updateResult.fullURL };
};

export default handleRedirectURL;
