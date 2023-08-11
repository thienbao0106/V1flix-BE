import { FilmsGenersController } from "../controllers/film_geners.controller";

import { Express, Router } from "express";
const router: Router = require("express").Router();
export const FilmsGenersRoutes = (app: Express) => {
  router.get(
    "/api/film/get-geners/:seriesId",
    FilmsGenersController.getFilmsGeners
  );
  router.post("/api/film/add-gener", FilmsGenersController.createFilmGeners);
  router.delete(
    "/api/film/delete-gener",
    FilmsGenersController.deleteFilmGeners
  );
  app.use(router);
};
