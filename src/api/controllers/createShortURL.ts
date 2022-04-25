import { Context } from "koa";
import generateShortUrl from "../helpers/generateShortURL";
import { createShortUrlByUrl } from "../services/shortURLServices";

type ShortURLResult = {
  id: string;
  short_url: string;
};

type RequestBody = {
  url: string;
  expireDate: string;
};

const handleCreateShortURL = async (ctx: Context) => {
  const { url, expireDate }: RequestBody = ctx.request.body;
  const shortURL = generateShortUrl(url, 5);
  const expire = new Date(expireDate);

  const result = await createShortUrlByUrl(url, shortURL, expire);

  if (!result.length) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot create" };
    return;
  }

  const { id, short_url }: ShortURLResult = result[0];

  ctx.status = 201;
  ctx.body = { status: "success", id, shortURL: short_url };
};

export default handleCreateShortURL;
