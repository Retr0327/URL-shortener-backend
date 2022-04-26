import { Context } from "koa";
import { deleteCachedURLs } from "../helpers/redis";
import { deleteShortUrlByShortURL } from "../services/shortURLServices";

const handleDeleteShortURL = async (ctx: Context) => {
  const { shortURL } = ctx.request.body;

  await Promise.all([
    deleteShortUrlByShortURL(shortURL),
    deleteCachedURLs(shortURL),
  ]);

  ctx.status = 202;
  ctx.body = { status: "success" };
};

export default handleDeleteShortURL;
