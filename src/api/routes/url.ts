import KoaRouter from "@koa/router";
import {
  handleCreateShortURL,
  handleDeleteShortURL,
  handleGetAllShortURLs,
  handleIncreaseClick,
} from "../controllers";
import validateURL from "../validations/urlValidations";
import { checkLongURLExists, checkShortURLExpired } from "../middlewares";

const router = new KoaRouter({ prefix: "/url" });

router.post("/", validateURL, checkLongURLExists, handleCreateShortURL);
router.post("/all", handleGetAllShortURLs);
router.put("/increase", checkShortURLExpired, handleIncreaseClick);
router.post("/delete", handleDeleteShortURL);

export { router as urlRoute };
