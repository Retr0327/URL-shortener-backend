import { Context } from "koa";
import { ShortURLResult } from "src/typings";
import { getFullURLByShortURL } from "../services/shortURLServices";

const handleRedirectURL = async (ctx: Context) => {
  const { shortURL } = ctx.params;
  const result = await getFullURLByShortURL(shortURL);

  if (!result!.length) {
    ctx.status = 200;
    ctx.body = { status: "success", message: "Expired" };
    return;
  }

  const { full_url: fullURL }: ShortURLResult = result![0];

  ctx.status = 200;
  ctx.body = { status: "success", fullURL };
};

export default handleRedirectURL;
