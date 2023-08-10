import { Series } from "./series.model";
import { sequelize } from "./db";
const { DataTypes } = require("sequelize");

export const Episodes = sequelize.define(
  "episodes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    ep_num: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    source: {
      type: DataTypes.STRING,
    },
    seriesId: {
      type: DataTypes.INTEGER,
      unique: true,
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
