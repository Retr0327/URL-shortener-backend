import { Context } from "koa";
import { getAllShortURLs } from "../services/shortURLServices";

const handleGetAllShortURLs = async (ctx: Context) => {
  const result = await getAllShortURLs();
  ctx.status = 200;
  ctx.body = { status: "success", data: result };
};

export default handleGetAllShortURLs;
