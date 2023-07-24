import { ImagesController } from "./../controllers/images.controller";
import { Express, Router } from "express";
const router: Router = require("express").Router();
export const ImagesRoutes = (app: Express) => {
  router.get("/api/images/find/:id_series", ImagesController.findImagesById);
  app.use(router);
};
