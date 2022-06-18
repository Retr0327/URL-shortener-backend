import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const handleGetAllShortURLs = async (ctx: RouterContext) => {
  const result = await shortUrls.findMany();

  if (result == null) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot create" };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: "success", data: result };
};

export default handleGetAllShortURLs;
