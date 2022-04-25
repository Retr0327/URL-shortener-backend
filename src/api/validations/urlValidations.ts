import { Context, Next } from "koa";
import { isURL, isExpired, isValidTimeString } from "./validationHelper";

const validateURL = async (ctx: Context, next: Next) => {
  const { url, expireDate } = ctx.request.body;
  const errorQueue = [];

  if (!isURL(url)) {
    errorQueue.unshift({ message: "Invalid URL" });
  }

  if (isExpired(expireDate) || !isValidTimeString(expireDate)) {
    errorQueue.unshift({ expire: "Invalid" });
  }

  if (errorQueue.length) {
    ctx.status = 400;
    ctx.body = { status: "failed", error: errorQueue };
    return;
  }

  next();
};

export default validateURL;
