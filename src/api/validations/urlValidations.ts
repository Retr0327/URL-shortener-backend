import { Context, Next } from "koa";
import { isURL, isExpired } from "./validationHelper";

const validateURL = async (ctx: Context, next: Next) => {
  const { url, expireDate } = ctx.request.body;
  // let errorCount: number = 0;

  // if (!isURL(url)) {
  //   errorCount++;
  // }


  next();
};

export default validateURL;
