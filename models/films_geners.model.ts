import { sequelize } from "./db";
import { Geners } from "./geners.model";
import { Series } from "./series.model";
const { DataTypes } = require("sequelize");

export const FilmsGeners = sequelize.define(
  "series_geners",
  {
    seriesId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Series,
        key: "id",
      },
    },
    generId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Geners,
        key: "id",
      },
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);
