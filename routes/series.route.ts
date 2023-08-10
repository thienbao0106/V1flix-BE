import { SeriesController } from "../controllers/series.controller";
import { Express, Router } from "express";
const router: Router = require("express").Router();
export const SeriesRoutes = (app: Express) => {
  router.get("/api/series", SeriesController.getAllSeries);
  router.get("/api/series/find/:title", SeriesController.findSeries);
  router.get("/api/series/film/:title", SeriesController.getFilmByTitle);
  router.post("/api/series/query", SeriesController.findAllSeriesByName);
  router.post("/api/series/create", SeriesController.createSeries);
  router.delete("/api/series/delete", SeriesController.deleteSeries);
  router.put("/api/series/update", SeriesController.updateSeries);

  app.use(router);
};
