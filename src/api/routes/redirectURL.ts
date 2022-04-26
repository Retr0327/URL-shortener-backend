import KoaRouter from "@koa/router";
import { handleRedirectURL } from "../controllers";

const router = new KoaRouter();

router.get("/:shortURL", handleRedirectURL);

export { router as redirectRoute };
