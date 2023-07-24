import { FilmsGeners } from "../models/films_geners.model";
import { Images } from "../models/images.model";
import { Series } from "../models/series.model";
import { Geners } from "./../models/geners.model";
import { Request, Response } from "express";

export const GenersController = {
  getGeners: async (req: Request, res: Response) => {
    const data: any = await Geners.findAll();
    if (data) {
      res.json({ status: "success", geners: data });
    } else {
      res.json({ status: "failed" });
    }
  },
  getGenerByName: async (req: Request, res: Response) => {
    let currentPage: any = req.query.currentPage || 0;
    let limitPage: any = req.query.limitPage || 12;
    console.log(currentPage);
    const data: any = await Geners.findAll({
      raw: true,
      where: {
        name: req.params.name,
      },
      include: [FilmsGeners],
    });

    if (data) {
      const ids = data.map((gener: any) => {
        return gener["series_geners.seriesId"];
      });
      const filmData = await Series.findAndCountAll({
        where: {
          id: ids,
        },
        limit: parseInt(limitPage),
        offset:
          parseInt(currentPage) > 0
            ? parseInt(currentPage) + parseInt(limitPage) - 1
            : 0,
        include: [Images],
      });
      const totalItem = Math.round(filmData.count / 3);

      if (filmData)
        res.json({
          status: "success",
          count: totalItem,
          totalPage: Math.round(totalItem / parseInt(limitPage)),
          films: filmData.rows,
        });
    } else {
      res.json({ status: "failed" });
    }
  },
};
