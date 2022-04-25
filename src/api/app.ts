import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import corsConfig from "./helpers/corsConfig";
import { allURLsRoute, rootRoute, urlRoute } from "./routes";

const app = new Koa();
app.use(cors(corsConfig));
app.use(koaBody({ urlencoded: true }));

app.use(rootRoute.routes());
app.use(rootRoute.allowedMethods());
app.use(urlRoute.routes());
app.use(urlRoute.allowedMethods());
app.use(allURLsRoute.routes());
app.use(allURLsRoute.allowedMethods);

export default app;
