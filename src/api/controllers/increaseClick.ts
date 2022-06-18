import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const handleIncreaseClick = async (ctx: RouterContext) => {
  const { shortURL } = ctx.request.body;

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

  ctx.status = 201;
  ctx.body = { status: "success", url: updateResult.fullURL };
};

export default handleIncreaseClick;
