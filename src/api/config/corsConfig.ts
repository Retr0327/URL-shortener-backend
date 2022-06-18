import { Options } from "@koa/cors";

const corsConfig: Options = {
  origin: (ctx) => {
    const whiteList = ["http://localhost:3001", process.env.URL];
    const origin = ctx.request.header.origin ?? "";

    if (whiteList.includes(origin)) {
      return origin;
    }

    return "";
  },
  credentials: true,
  allowMethods: ["GET", "POST", "PUT"],
};

export default corsConfig;
