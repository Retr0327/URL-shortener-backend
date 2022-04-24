import { Context } from "koa";

const handleCreateShortURL = async (ctx: Context) => {
  ctx.status = 201;
  ctx.body = { status: "success" };
};

export default handleCreateShortURL;
