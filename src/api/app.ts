import Koa from "koa";
import cors from "@koa/cors";
import corsConfig from "./helpers/corsConfig";
import { rootRoute, urlRoute } from "./routes";

const app = new Koa();
app.use(cors(corsConfig));

app.use(rootRoute.routes());
app.use(rootRoute.allowedMethods());
app.use(urlRoute.routes());
app.use(urlRoute.allowedMethods());

export default app;
