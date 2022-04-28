import { Context, Next } from "koa";
import { getFullURLByShortURL } from "../services/shortURLServices";

const checkShortURLExpired = async (ctx: Context, next: Next) => {
  const { shortURL } = ctx.request.body;
  const result = await getFullURLByShortURL(shortURL);

  if (!result?.length) {
    ctx.status = 200;
    ctx.body = { status: "success", message: "Expired" };
    return;
  }

  return next();
};

export default checkShortURLExpired;
