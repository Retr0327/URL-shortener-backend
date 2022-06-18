import { cacheURL } from "@utils";
import { RouterContext } from "@koa/router";
import { PrismaClient } from "@prisma/client";
import { generateShortURL, getExpireTime } from "@utils";

type RequestBody = {
  url: string;
  expireDate: string;
};

const { shortUrls } = new PrismaClient();

const handleCreateShortURL = async (ctx: RouterContext) => {
  const { url, expireDate }: RequestBody = ctx.request.body;
  const shortURL = generateShortURL(5);
  const expire = new Date(expireDate);

  const urlResult = await shortUrls.create({
    data: { fullURL: url, shortURL, expire },
    select: { id: true, fullURL: true, shortURL: true },
  });

  if (urlResult == null) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot create" };
    return;
  }

  await cacheURL(
    urlResult.id.toString(),
    urlResult.fullURL,
    urlResult.shortURL,
    getExpireTime(expire)
  );

  ctx.status = 201;
  ctx.body = {
    status: "success",
    id: urlResult.id,
    shortURL: urlResult.shortURL,
  };
};

export default handleCreateShortURL;
