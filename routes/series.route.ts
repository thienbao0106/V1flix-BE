import { SeriesController } from "../controllers/series.controller";
import { Express, Router } from "express";
const router: Router = require("express").Router();
export const SeriesRoutes = (app: Express) => {
  router.get("/api/series", SeriesController.getAllSeries);
  router.get("/api/series/find/:title", SeriesController.findSeries);
  router.get("/api/series/film/:title", SeriesController.getFilmByTitle);
  router.post("/api/series/query", SeriesController.findAllSeriesByName);

  app.use(router);
};
