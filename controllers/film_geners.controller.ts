import { createData } from "../middleware/handleCreate";
import { Geners } from "../models/geners.model";
import { Series } from "../models/series.model";
import { FilmsGeners } from "./../models/films_geners.model";

import { Request, Response } from "express";

export const FilmsGenersController = {
  getFilmsGeners: async (req: Request, res: Response) => {
    const data: any = await FilmsGeners.findAll({
      raw: true,
      where: {
        seriesId: req.params.seriesId,
      },
    });
    // let finalData = [];

    if (data) {
      let listId = data.map((item: any) => item.generId);
      const finalData: any = await Geners.findAll({
        where: {
          id: listId,
        },
        attributes: {
          exclude: ["id"],
        },
      });
      res.json({ status: "success", listFilmsGeners: finalData });
    } else {
      res.json({ status: "failed" });
    }
  },
  createFilmGeners: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const filmFound = await Series.findOne({
        where: {
          id: data.seriesId,
        },
      });
      const generFound = await Geners.findOne({
        where: {
          id: data.generId,
        },
      });
      if (filmFound && generFound) {
        await createData(FilmsGeners, data, data, {
          response: res,
          dataSuccess: {
            status: "success",
            message: "Add gener to film successfully",
          },
          dataFailed: {
            status: "error",
            message: "Can't add a duplicated gener",
          },
        });
      } else {
        res.json({
          status: "error",
          message: "Can't find film or gener type",
        });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  deleteFilmGeners: async (req: Request, res: Response) => {
    const result = await FilmsGeners.destroy({
      where: {
        seriesId: req.body.seriesId,
        generId: req.body.generId,
      },
    });
    if (result) {
      res.json({
        status: "success",
        message: "Delete this film's gener successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "Can't find this film's gener to delete",
      });
    }
  },
};
