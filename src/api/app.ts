import Koa from "koa";
import router from "@routes";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import morgan from "koa-morgan";
import { corsConfig } from "./helpers";
import bodyParser from "koa-bodyparser";
import { customDevFormat } from "@utils";

morgan.format("custom-dev", customDevFormat);

const app = new Koa();

app.use(cors(corsConfig));
app.use(helmet());
app.use(bodyParser());
app.use(morgan("custom-dev"));

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
