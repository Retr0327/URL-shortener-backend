import KoaRouter from "@koa/router";
import {
  handleCreateShortURL,
  handleDeleteShortURL,
  handleGetAllShortURLs,
} from "../controllers";
import { checkLongURLExists } from "../middlewares";
import validateURL from "../validations/urlValidations";

const router = new KoaRouter({ prefix: "/url" });

router.post("/", validateURL, checkLongURLExists, handleCreateShortURL);
router.post("/all", handleGetAllShortURLs);
router.post("/delete", handleDeleteShortURL);

export { router as urlRoute };
