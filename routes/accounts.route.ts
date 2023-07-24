import { AccountsController } from "./../controllers/accounts.controller";
import { Express, Router } from "express";
const router: Router = require("express").Router();
export const AccountsRoutes = (app: Express) => {
  router.post("/api/login", AccountsController.confirmAccount);
  router.post("/api/register", AccountsController.registerAccount);
  router.get("/api/get-account/:username", AccountsController.findAccount);

  app.use(router);
};
