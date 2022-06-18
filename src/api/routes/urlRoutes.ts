import {
  handleCreateShortURL,
  handleGetAllShortURLs,
  handleDeleteShortURL,
  handleIncreaseClick,
} from "@controllers";
import Router from "@koa/router";
import { checkLongURLExists, checkShortURLTTL } from "@middlewares";
import { validateCreateShortURL, validateShortURL } from "@validations";

const router = new Router({ prefix: "/url" });

router.post(
  "/",
  validateCreateShortURL,
  checkLongURLExists,
  handleCreateShortURL
);

router.post("/all", handleGetAllShortURLs);

router.post("/delete", validateShortURL, handleDeleteShortURL);

router.put(
  "/increase",
  checkShortURLTTL,
  validateShortURL,
  handleIncreaseClick
);

export { router as urlRoutes };
