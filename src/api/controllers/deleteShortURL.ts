import { Context } from "koa";
import { removeCachedURL } from "@utils";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

const handleDeleteShortURL = async (ctx: Context) => {
  const { id, shortURL } = ctx.request.body;

  await Promise.all([
    removeCachedURL(shortURL),
    shortUrls.delete({ where: { id } }),
  ]);

  ctx.status = 202;
  ctx.body = { status: "success" };
};

export default handleDeleteShortURL;
