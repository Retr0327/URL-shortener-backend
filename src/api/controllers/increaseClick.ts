import { Context } from "koa";

const handleIncreaseClick = async (ctx: Context) => {
  console.log(ctx.request.body);

  ctx.status = 200;
};

export default handleIncreaseClick;
