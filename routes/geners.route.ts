import { GenersController } from "./../controllers/geners.controller";

import { Express, Router } from "express";
const router: Router = require("express").Router();
export const GenersRoutes = (app: Express) => {
  router.get("/api/geners", GenersController.getGeners);
  router.get("/api/geners/find/:name", GenersController.getGenerByName);

  app.use(router);
};
