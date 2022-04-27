import { Options } from "@koa/cors";
import { dockerEnv } from "../constants";

const { period } = dockerEnv;

const corsConfig: Options = {
  origin: (ctx) => {
    if (ctx.url === "/") {
      return "*";
    }
    let url = "http://localhost:3001";

    if (period === "production") {
      url = "http://client";
    }

    return url;
  },
  credentials: true,
  allowMethods: ["GET", "POST", "PUT"],
};

export default corsConfig;
