import { Images } from "./../models/images.model";
import { IImages } from "../interface";
import { Request, Response } from "express";
export const ImagesController = {
  findImagesById: async (req: Request, res: Response) => {
    try {
      const data: IImages = await Images.findAll({
        where: {
          seriesId: req.params.id_series,
        },
      });
      if (data) {
        console.log("Query image successfully");
        res.json({ status: "success", images: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
