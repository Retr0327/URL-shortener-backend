import { Context, Next } from "koa";
import { getCachedURL } from "../helpers/redis";

const checkShortURLExists = async (ctx: Context, next: Next) => {
  const { shortURL } = ctx.params;
  const result = await getCachedURL(shortURL);
  console.log(result)
  return next();
};

export default checkShortURLExists;
