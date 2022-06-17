import Router from "@koa/router";
import { urlRoutes } from "./urlRoutes";
import { RouterContext } from "@koa/router";

const router = new Router({});

router.get("/", (ctx: RouterContext) => {
  const ip = ctx.request.ip.replace("::ffff:", "");
  ctx.status = 200;
  ctx.body = { status: "success", ip };
});

const routes = [urlRoutes];

for (let route of routes) {
  router.use(route.routes());
  router.use(route.allowedMethods());
}

export default router;
