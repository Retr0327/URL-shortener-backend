import { Context } from "koa";
import { cacheURL } from "../helpers/redis";
import { ShortURLResult } from "src/typings";
import { generateShortUrl, getExpireTime } from "../helpers";
import { createShortUrlByUrl } from "../services/shortURLServices";

type RequestBody = {
  url: string;
  expireDate: string;
};

const handleCreateShortURL = async (ctx: Context) => {
  const { url, expireDate }: RequestBody = ctx.request.body;
  const shortURL = generateShortUrl(url, 5);
  const expire = new Date(expireDate);

  const result = await createShortUrlByUrl(url, shortURL, expire);

  if (!result?.length) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot create" };
    return;
  }

  const { id, short_url }: ShortURLResult = result[0];

  await cacheURL(id, url, short_url, getExpireTime(expire));

  ctx.status = 200;
  ctx.body = { status: "success", id, shortURL: short_url };
};

export default handleCreateShortURL;
