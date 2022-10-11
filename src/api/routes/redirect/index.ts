import Router from '@koa/router';
import { hasShortURL } from '@middlewares/url';
import handleRedirectURL from '@controllers/redirect';

const router = new Router();

router.get('/:shortURL', hasShortURL, handleRedirectURL);

export default router;
