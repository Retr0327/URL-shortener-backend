import { Options } from "@koa/cors";

const corsConfig: Options = {
  origin: (ctx) => {
    if (ctx.url === "/") {
      return "*";
    }

    return "http://localhost:3001";
  },
  credentials: true,
  allowMethods: ["GET", "POST", "PUT"],
};

export default corsConfig;
    
