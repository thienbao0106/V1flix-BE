import { GenersController } from "./../controllers/geners.controller";

import { Express, Router } from "express";
const router: Router = require("express").Router();
export const GenersRoutes = (app: Express) => {
  router.get("/api/geners", GenersController.getGeners);
  router.get("/api/geners/find/:name", GenersController.getGenerByName);
  router.post("/api/geners/create", GenersController.createGener);
  router.delete("/api/geners/delete", GenersController.deleteGener);
  router.put("/api/geners/update", GenersController.updateGener);

  app.use(router);
};
