import { IEpisodes } from "./../interface";
import { Episodes } from "../models/episodes.model";
import { Request, Response } from "express";
import { Series } from "../models/series.model";
import { Images } from "../models/images.model";
export const EpisodesController = {
  getEpisodes: async (req: Request, res: Response) => {
    try {
      const data: IEpisodes = await Episodes.findAll({
        order: [["id", "DESC"]],
        include: [{ model: Series, include: [Images] }],
      });
      if (data) {
        console.log("Query episode successfully");
        res.json({ status: "success", episodes: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  getEpisodeById: async (req: Request, res: Response) => {
    try {
      const data: IEpisodes = await Episodes.findOne({
        where: req.params.id_series,
      });
      if (data) {
        console.log("Query episode successfully");
        res.json({ status: "success", episodes: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
