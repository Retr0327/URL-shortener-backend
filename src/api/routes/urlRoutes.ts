import Router, { RouterContext } from "@koa/router";
import { validateCreateShortURL } from "../validations";

const router = new Router({ prefix: "/url" });

router.post("/", validateCreateShortURL, (ctx: RouterContext) => {
    ctx.body = { msg: '1'}
})

// router.post("/", validateURL, checkLongURLExists, handleCreateShortURL);
// router.post("/all", handleGetAllShortURLs);
// router.put("/increase", checkShortURLExpired, handleIncreaseClick);
// router.post("/delete", handleDeleteShortURL);

export { router as urlRoutes };
