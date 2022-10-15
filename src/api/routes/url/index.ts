import {
  handleCheckURL,
  handleCreateShortURL,
  handleGetAllShortURLs,
  handleDeleteShortURL,
  handleIncreaseClick,
} from '@controllers/url';
import Router from '@koa/router';
import { checkTTL, hasLongURL } from '@middlewares/url';
import { validateCreateURL, validateShortURL } from '@validations/url';

const router = new Router({ prefix: '/url' });

router.post('/', validateCreateURL, hasLongURL(), handleCreateShortURL);

router.post('/existence', handleCheckURL);

router.get('/', handleGetAllShortURLs);

router.delete('/', validateShortURL, handleDeleteShortURL);

router.put('/', checkTTL(), validateShortURL, handleIncreaseClick);

export default router;
