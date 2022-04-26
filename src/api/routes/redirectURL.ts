import KoaRouter from "@koa/router";
import { handleRedirectURL } from "../controllers";
import { checkShortURLExists } from "../middlewares";

const router = new KoaRouter();

router.get("/:shortURL", checkShortURLExists, handleRedirectURL);

export { router as redirectRoute };
