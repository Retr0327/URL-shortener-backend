import { Context } from "koa";
import {
  getFullURLByShortURL,
  updateTotalClickByShortURL,
} from "../services/shortURLServices";
import { ShortURLResult } from "src/typings";

const handleRedirectURL = async (ctx: Context) => {
  const { shortURL } = ctx.params;
  const result = await getFullURLByShortURL(shortURL);

  if (!result!.length) {
    ctx.status = 200;
    ctx.body = { status: "success", message: "Expired" };
    return;
  }

  const { full_url: fullURL }: ShortURLResult = result![0];

  await updateTotalClickByShortURL(shortURL);

  ctx.status = 200;
  ctx.body = { status: "success", fullURL };
};

export default handleRedirectURL;
