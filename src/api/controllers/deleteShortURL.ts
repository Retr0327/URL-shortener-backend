import { Context } from "koa";

const handleDeleteShortURL = async (ctx: Context) => {
  ctx.status = 204;
};

export default handleDeleteShortURL;
