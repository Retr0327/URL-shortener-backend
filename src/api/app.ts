import Koa from "koa";
import cors from "@koa/cors";
import corsConfig from "./helpers/corsConfig"
import { rootRoute } from "./routes";

const app = new Koa();
app.use(cors(corsConfig));

app.use(rootRoute.routes());
app.use(rootRoute.allowedMethods());

export default app;
    
