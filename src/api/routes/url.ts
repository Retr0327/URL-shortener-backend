import KoaRouter from "@koa/router";
import { handleCreateShortURL } from "../controllers";
import validateURL from "../validations/urlValidations";

const router = new KoaRouter({ prefix: "/url" });

router.post("/", validateURL, handleCreateShortURL);

export { router as urlRoute };
