import { Options } from "@koa/cors";

const corsConfig: Options = {
  origin: (ctx) => {
    if (ctx.url === "/") {
      return "*";
    }
    let url = "http://localhost:3001";

    if (process.env.NODE_ENV === "production") {
      url = "http://client";
    }

    return url;
  },
  credentials: true,
  allowMethods: ["GET", "POST", "PUT"],
};

export default corsConfig;
