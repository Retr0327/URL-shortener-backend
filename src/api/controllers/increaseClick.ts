import { Context } from "koa";
import { updateTotalClickByShortURL } from "../services/shortURLServices";

const handleIncreaseClick = async (ctx: Context) => {
  const { shortURL } = ctx.request.body;
  const result = await updateTotalClickByShortURL(shortURL);

  if (!result?.length) {
    ctx.status = 500;
    ctx.body = { status: "failed", message: "Cannot add" };
    return;
  }

  ctx.status = 201;
  ctx.body = { status: "success" };
};

export default handleIncreaseClick;
