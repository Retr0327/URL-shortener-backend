import Router from "@koa/router";

const router = new Router({ prefix: "/url" });

// router.post("/", validateURL, checkLongURLExists, handleCreateShortURL);
// router.post("/all", handleGetAllShortURLs);
// router.put("/increase", checkShortURLExpired, handleIncreaseClick);
// router.post("/delete", handleDeleteShortURL);

export { router as urlRoutes };
