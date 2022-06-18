import { urlRoutes } from "./urlRoutes";
import Router, { RouterContext } from "@koa/router";
import { redirectURLRoute } from "./redirectURLRoute";

const router = new Router({});

router.get("/", (ctx: RouterContext) => {
  const ip = ctx.request.ip.replace("::ffff:", "");
  ctx.status = 200;
  ctx.body = { status: "success", ip };
});

const routes = [urlRoutes, redirectURLRoute];

for (let route of routes) {
  router.use(route.routes());
  router.use(route.allowedMethods());
}

export default router;
