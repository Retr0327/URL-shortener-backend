import { Context, Next } from "koa";
import { getShortURLByFullURL } from "../services/shortURLServices";

const checkLongURLExists = async (ctx: Context, next: Next) => {
  const { url, expireDate } = ctx.request.body;
  const result = await getShortURLByFullURL(url);

console.log(result)


//   return next()

};

export default checkLongURLExists;
