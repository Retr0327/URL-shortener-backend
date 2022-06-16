import Koa from "koa";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import morgan from "koa-morgan";
import { corsConfig } from "./helpers";
import bodyParser from "koa-bodyparser";
import { customDevFormat } from "@utils";
import { rootRoute, urlRoute, redirectRoute } from "./routes";

morgan.format("custom-dev", customDevFormat);

const app = new Koa();

app.use(cors(corsConfig));
app.use(helmet());
app.use(bodyParser());
app.use(morgan("custom-dev"));

app.use(rootRoute.routes());
app.use(rootRoute.allowedMethods());
app.use(urlRoute.routes());
app.use(urlRoute.allowedMethods());
app.use(redirectRoute.routes());
app.use(redirectRoute.allowedMethods());

export default app;
