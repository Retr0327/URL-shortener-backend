import KoaRouter from "@koa/router";
import { handleGetAllShortURLs } from "../controllers";

const router = new KoaRouter();

router.post("/all_urls", handleGetAllShortURLs);

export { router as allURLsRoute };
