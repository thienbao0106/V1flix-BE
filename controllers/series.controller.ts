import { Episodes } from "./../models/episodes.model";
import { Images } from "./../models/images.model";
import { ISeries } from "../interface";
import { Request, Response } from "express";
import { Series } from "../models/series.model";
import { FilmsGeners } from "../models/films_geners.model";
import { createImagesData } from "../middleware/handleCreate";
import { Lists } from "../models/lists.model";
const { Op } = require("sequelize");
export const SeriesController = {
  getAllSeries: async (req: Request, res: Response) => {
    console.log(req.query);

    const currentPage: any = req.query.currentPage;
    const limitPage: any = req.query.limitPage;
    if (!currentPage || !limitPage) {
      const data: ISeries[] | any = await Series.findAll({
        include: Images,
        attributes: { exclude: ["season"] },
        order: [["id", "desc"]],
      });
      if (data) {
        console.log("Query successfully");
        res.json({
          status: "success",
          series: data,
        });
      }
    } else {
      const data: ISeries[] | any = await Series.findAndCountAll({
        include: Images,
        limit: parseInt(limitPage),
        offset:
          parseInt(currentPage) > 0
            ? parseInt(currentPage) + parseInt(limitPage) - 1
            : 0,
        attributes: { exclude: ["season"] },
        order: [["id", "desc"]],
      });

      const totalItem: number = Math.floor(data.count / 3);
      const totalPage: number = Math.floor(
        data.rows.length / parseInt(limitPage)
      );
      console.log(totalItem);
      console.log(data.rows.length === limitPage);
      if (data) {
        console.log("Query successfully");
        res.json({
          status: "success",
          count: data.rows.length,
          totalPage: totalItem % limitPage === 0 ? totalPage : totalPage + 1,
          series: data.rows,
        });
      }
    }
  },
  //for search
  findSeries: async (req: Request | any, res: Response) => {
    const limit = req.query.amount
      ? {
          limit: parseInt(req.query.amount),
          attributes: ["id", "title"],
        }
      : {
          include: [Images],
        };

    try {
      const data: ISeries[] = await Series.findAll({
        where: {
          title: { [Op.like]: `%${req.params.title}%` },
        },
        ...limit,
      });
      if (data) {
        console.log("Find successfully");
        res.json({ status: "success", series: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  getFilmByTitle: async (req: Request, res: Response) => {
    // const newStr = req.params.title.replace(/[\s_]+/g, " ");
    try {
      const data: ISeries[] = await Series.findOne({
        where: {
          title: { [Op.like]: `%${req.params.title}%` },
        },
        include: [Images, Episodes],
      });
      if (data) {
        console.log("Find successfully");
        res.json({ status: "success", series: data });
      } else {
        console.log("Can't find the series");
        res.status(404).json({ status: "failed" });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  //for search for search page
  findAllSeriesByName: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { status, filter, genre } = req.body;
      console.log("table name: ", FilmsGeners.getTableName());
      const hasStatus = status !== "" && { status };
      const hasGenere = genre !== "" && {
        where: {
          generId: genre,
        },
      };

      const data: ISeries[] = await Series.findAll({
        where: {
          title: { [Op.like]: `%${filter}%` },
          ...hasStatus,
        },
        include: [{ model: FilmsGeners, ...hasGenere }, { model: Images }],
      });
      if (data) {
        console.log("Find all series successfully");
        res.json({ status: "success", series: data });
      } else {
        res.status(404).json({ status: "failed" });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  createSeries: async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    try {
      const [series, created] = await Series.findOrCreate({
        where: { title: data.title },
        defaults: data,
      });
      console.log(created);
      if (created) {
        const images = createImagesData(series.title, series.id);
        const imageResponse = Images.bulkCreate(images);
        if (imageResponse) {
          console.log("Create successfully");
          res.status(200).json({ status: "success", series: series });
        } else {
          res.status(400).json({ status: "failed", msg: "Image error" });
        }
      } else {
        res.status(400).json({ status: "failed", msg: "Series existed" });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  updateSeries: async (req: Request, res: Response) => {
    const data = { ...req.body };
    delete data.id;
    try {
      const search = await Series.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (search) {
        const result = await Series.update(data, {
          where: {
            id: req.body.id,
          },
        });
        console.log(result);
        res.status(200).json({ status: "success", msg: "Update successfully" });
      } else {
        res
          .status(400)
          .json({ status: "failed", msg: "Series can't be updated" });
      }
    } catch (err: any) {
      res
        .status(400)
        .json({ status: "failed", msg: "Series can't be updated" });
    }
  },
  deleteSeries: async (req: Request, res: Response) => {
    try {
      const search = await Series.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (search) {
        //will fix this one soon
        await Images.destroy({
          where: {
            seriesId: req.body.id,
          },
        });
        await Lists.destroy({
          where: {
            seriesId: req.body.id,
          },
        });
        await FilmsGeners.destroy({
          where: {
            seriesId: req.body.id,
          },
        });
        await Episodes.destroy({
          where: {
            seriesId: req.body.id,
          },
        });
        const result = await Series.destroy({
          where: {
            id: req.body.id,
          },
        });
        if (result)
          res
            .status(200)
            .json({ status: "success", msg: "Delete successfully" });
      } else {
        res
          .status(400)
          .json({ status: "failed", msg: "Series can't be found" });
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(400)
        .json({ status: "failed", msg: "Series can't be deleted" });
    }
  },
};
