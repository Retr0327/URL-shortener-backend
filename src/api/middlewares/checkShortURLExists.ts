import { Context, Next } from "koa";
import { getCachedURL } from "../helpers/redis";
import { updateTotalClickByShortURL } from "../services/shortURLServices";

const checkShortURLExists = async (ctx: Context, next: Next) => {
  const { shortURL } = ctx.params;
  const result = await getCachedURL(shortURL);

  if (!Object.keys(result).length) {
    return next();
  }

  await updateTotalClickByShortURL(shortURL);
  ctx.status = 200;
  ctx.body = { fullURL: result.url };
};

export default checkShortURLExists;
