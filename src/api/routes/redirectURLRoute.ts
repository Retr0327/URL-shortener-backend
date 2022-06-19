import Router from "@koa/router";
import { handleRedirectURL } from "@controllers";
import { checkShortURLExists } from "@middlewares/urlChecker";

const router = new Router({});

router.get("/:shortURL", checkShortURLExists, handleRedirectURL);

export { router as redirectURLRoute };
