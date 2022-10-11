import PREFIX from '@config';
import Router, { RouterContext } from '@koa/router';
import urlRouter from './url';
import redirectRouter from './redirect';

const entry = new Router();

entry.prefix(PREFIX);

entry.get('/', (ctx: RouterContext) => {
  const ip = ctx.request.ip.replace('::ffff:', '');
  ctx.status = 200;
  ctx.body = { status: 'success', ip };
});

const routers = [urlRouter, redirectRouter];

routers.forEach((router) => {
  entry.use(router.routes());
  entry.use(router.allowedMethods());
});

export default entry;
