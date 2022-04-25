import { URL } from "url";
import { Context, Next } from "koa";

function isURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

const validateURL = async (ctx: Context, next: Next) => {
  const { url, expireDate } = ctx.request.body;

  next();
};

export default validateURL;
