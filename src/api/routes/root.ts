import KoaRouter from "@koa/router";

const router = new KoaRouter();

router.get("/", (ctx) => {
  const ip = ctx.request.ip;
  ctx.status = 200;
  ctx.body = { status: "success", ip };
});

export { router as rootRoute };
