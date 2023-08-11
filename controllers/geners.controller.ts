import { createData } from "../middleware/handleCreate";
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
  createGener: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const capitalName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      const newData = {
        name: capitalName,
      };

      await createData(Geners, newData, newData, {
        response: res,
        dataSuccess: {
          status: "success",
          message: "Add successfully",
        },
        dataFailed: {
          status: "error",
          message: "Can't create a duplicated geners",
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deleteGener: async (req: Request, res: Response) => {
    try {
      const findGener = await Geners.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (findGener) {
        await FilmsGeners.destroy({
          where: {
            generId: req.body.id,
          },
        });
        await Geners.destroy({
          where: {
            id: req.body.id,
          },
        });
        res.json({
          status: "success",
          message: "Delete successfully",
        });
      } else {
        res.json({
          status: "error",
          message: "Can't find this gener to delete",
        });
      }
    } catch (error: any) {}
  },
  updateGener: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const capitalName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      const found = await Geners.findOne({
        where: {
          name: capitalName,
        },
      });
      console.log(found);
      if (!found) {
        const response = await Geners.update(
          {
            name: capitalName,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
        if (response) {
          res.json({ status: "success", message: "Edit a gener successfully" });
        } else {
          res.json({ status: "error", message: "Can't edit this gener" });
        }
      } else {
        res.json({ status: "error", message: "Name is dupilcated" });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
