import { Context, Next } from "koa";
import { getCachedURL } from "../helpers/redis";

const checkShortURLExists = async (ctx: Context, next: Next) => {
  const { shortURL } = ctx.params;
  const result = await getCachedURL(shortURL);

  if (!Object.keys(result).length) {
    return next();
  }

  ctx.status = 302;
  ctx.redirect(result.url);
};

export default checkShortURLExists;
