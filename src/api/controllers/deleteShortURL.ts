import { Context } from "koa";
import { deleteCachedURL } from "../helpers/redis";
import { deleteShortUrlByShortURL } from "../services/shortURLServices";

const handleDeleteShortURL = async (ctx: Context) => {
  const { shortURL } = ctx.request.body;

  await Promise.all([
    deleteShortUrlByShortURL(shortURL),
    deleteCachedURL(shortURL),
  ]);

  ctx.status = 202;
  ctx.body = { status: "success" };
};

export default handleDeleteShortURL;
