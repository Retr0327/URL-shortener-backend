import { Context } from "koa";
import { ShortURLResult } from "src/typings";
import { updateTotalClickByShortURL } from "../services/shortURLServices";

const handleIncreaseClick = async (ctx: Context) => {
  const { shortURL } = ctx.request.body;
  const result = await updateTotalClickByShortURL(shortURL);

  if (!result?.length) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot add" };
    return;
  }

  const { full_url }: ShortURLResult = result[0];

  ctx.status = 201;
  ctx.body = { status: "success", url: full_url };
};

export default handleIncreaseClick;
