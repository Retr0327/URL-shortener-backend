import { Context } from "koa";

const handleRedirectURL = async (ctx: Context) => {
  ctx.status = 200;
};

export default handleRedirectURL;
