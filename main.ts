import { AccountsRoutes } from "./routes/accounts.route";
import { Express, Request, Response, NextFunction } from "express";

import { setRelationships } from "./relationships";
import { ImagesRoutes } from "./routes/images.route";
import { SeriesRoutes } from "./routes/series.route";
import { ListsRoutes } from "./routes/lists.route";
import { GenersRoutes } from "./routes/geners.route";
import { FilmsGenersRoutes } from "./routes/films_geners.route";
import { EpisodesRoutes } from "./routes/episodes.route";

require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use(cors());
app.use(express.json());
app.listen(Number(port), () => {
  console.log(`Server is listening on port ${port} ...`);
});
//Routes
SeriesRoutes(app);
ImagesRoutes(app);
AccountsRoutes(app);
ListsRoutes(app);
GenersRoutes(app);
EpisodesRoutes(app);
FilmsGenersRoutes(app);
//Relationship
setRelationships();

const setCache = (req: Request, res: Response, next: NextFunction) => {
  const period = 60 * 5;
  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    res.set("Cache-control", `no-store`);
  }
  next();
};
app.use(setCache);
