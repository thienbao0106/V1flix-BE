import { EpisodesController } from "./../controllers/episodes.controller";
import { Express, Router } from "express";
const router: Router = require("express").Router();
export const EpisodesRoutes = (app: Express) => {
  router.get(
    "/api/episodes/find/:id_series",
    EpisodesController.getEpisodeById
  );
  router.get("/api/episodes", EpisodesController.getEpisodes);
  router.post("/api/episodes/create", EpisodesController.createEpisode);
  router.delete("/api/episodes/delete", EpisodesController.deleteEpisode);
  router.put("/api/episodes/update", EpisodesController.updateEpisode);
  app.use(router);
};
