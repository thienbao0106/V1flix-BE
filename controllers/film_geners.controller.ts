import { Geners } from "../models/geners.model";
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
};
