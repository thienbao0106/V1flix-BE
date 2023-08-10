import { IEpisodes } from "./../interface";
import { Episodes } from "../models/episodes.model";
import { Request, Response } from "express";
import { Series } from "../models/series.model";
import { Images } from "../models/images.model";
import { createData } from "../middleware/handleCreate";
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
  createEpisode: async (req: Request, res: Response) => {
    try {
      const findSeries = await Series.findOne({
        where: {
          id: req.body.seriesId,
        },
      });

      if (findSeries) {
        const found = req.body;
        await createData(
          Episodes,
          { title: found.title, ep_num: found.ep_num },
          found,
          {
            response: res,
            dataSuccess: {
              status: "success",
              message: "Add successfully",
            },
            dataFailed: {
              status: "error",
              message: "Can't create a duplicated episode",
            },
          }
        );
        return;
      } else {
        res.json({
          status: "error",
          message: "Can't find this series to add new episode",
        });
        return;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  deleteEpisode: async (req: Request, res: Response) => {
    try {
      const result = await Episodes.destroy({
        where: {
          id: req.body.id,
        },
      });
      if (result) {
        res.json({
          status: "success",
          message: "Delete successfully",
        });
      } else {
        res.json({
          status: "error",
          message: "Can't delete this episode",
        });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  updateEpisode: async (req: Request, res: Response) => {
    try {
      const result = await Episodes.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      if (result) {
        res.json({
          status: "success",
          message: "Update successfully",
        });
      } else {
        res.json({
          status: "error",
          message: "Can't update this episode",
        });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
