import { Accounts } from "./accounts.model";
import { sequelize } from "./db";
import { Series } from "./series.model";
const { DataTypes } = require("sequelize");

export const Lists = sequelize.define(
  "accounts_series",
  {
    accountId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Accounts,
        key: "id",
      },
    },
    seriesId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Series,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
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
