import { ListsController } from "./../controllers/lists.controller";

import { Express, Router } from "express";
const router: Router = require("express").Router();
export const ListsRoutes = (app: Express) => {
  router.post("/api/series/add", ListsController.addSeries);
  router.get("/api/series/get/:userId/:status", ListsController.getLists);
  router.get(
    "/api/series/get-list/:userId/:seriesId",
    ListsController.getListById
  );
  router.put(
    "/api/series/update/:userId/:seriesId",
    ListsController.updateStatus
  );

  router.delete(
    "/api/series/delete/:userId/:seriesId",
    ListsController.deleteStatus
  );
  app.use(router);
};
