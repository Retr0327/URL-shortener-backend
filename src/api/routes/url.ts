import KoaRouter from "@koa/router";

const router = new KoaRouter();

router.post("/", (ctx) => {
  return "hello";
});

export { router as urlRoute };
