import { Series } from "./series.model";
import { sequelize } from "./db";
const { DataTypes } = require("sequelize");

export const Images = sequelize.define(
  "images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    seriesId: {
      type: DataTypes.INTEGER,
      references: {
        model: Series,
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
