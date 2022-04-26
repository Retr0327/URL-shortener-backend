import KoaRouter from "@koa/router";
import validateURL from "../validations/urlValidations";
import { handleCreateShortURL, handleDeleteShortURL } from "../controllers";

const router = new KoaRouter({ prefix: "/url" });

router.post("/", validateURL, handleCreateShortURL);
router.post("/delete", handleDeleteShortURL);

export { router as urlRoute };
