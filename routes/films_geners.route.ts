import { FilmsGenersController } from "../controllers/film_geners.controller";

import { Express, Router } from "express";
const router: Router = require("express").Router();
export const FilmsGenersRoutes = (app: Express) => {
  router.get(
    "/api/film/get-geners/:seriesId",
    FilmsGenersController.getFilmsGeners
  );
  app.use(router);
};
