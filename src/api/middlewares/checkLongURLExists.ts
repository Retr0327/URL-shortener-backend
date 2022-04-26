import { Context, Next } from "koa";
import { ShortURLResult, CreatedURLRequestBody } from "types";
import { getShortURLByFullURL } from "../services/shortURLServices";

const checkLongURLExists = async (ctx: Context, next: Next) => {
  const { url }: CreatedURLRequestBody = ctx.request.body;
  const result = await getShortURLByFullURL(url);

  if (!result?.length) {
    return next();
  }
  const { id, short_url: shortURL }: ShortURLResult = result[0];

  ctx.status = 200;
  ctx.body = { status: "success", id, shortURL };
};

export default checkLongURLExists;
