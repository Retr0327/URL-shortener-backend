import Koa from 'koa';
import router from '@routes';
import cors from '@middlewares/cors';
import morgan from '@middlewares/morgan';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(morgan());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
