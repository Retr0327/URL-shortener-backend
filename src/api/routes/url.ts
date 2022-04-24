import KoaRouter from "@koa/router";
import { handleCreateShortURL } from "../controllers";

const router = new KoaRouter();

router.post('/url', handleCreateShortURL);

export { router as urlRoute };
