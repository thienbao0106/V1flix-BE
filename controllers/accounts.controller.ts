import { IAccount } from "./../interface";
import { Accounts } from "../models/accounts.model";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
export const AccountsController = {
  registerAccount: async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    const hashPassword = await bcrypt.hashSync(password, 10);
    const data: IAccount = await Accounts.create({
      email: email,
      username: username,
      password: hashPassword,
    });

    // const match: boolean = await bcrypt.compare(password, data.password);

    if (data) {
      res.status(200).json({ status: "succeed" });
    } else {
      res.status(200).json({ status: "failed" });
    }
  },

  confirmAccount: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const data: IAccount = await Accounts.findOne({
      where: {
        username: username,
      },
    });

    const match: boolean = await bcrypt.compare(password, data.password);

    if (match) {
      res.status(200).json({ status: "succeed", id: data.id });
    } else {
      res.status(200).json({ status: "failed" });
    }
  },

  findAccount: async (req: Request, res: Response) => {
    const data: IAccount = await Accounts.findOne({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: ["password"] },
    });
    console.log(data);
    if (data) {
      res.json({ status: "succeed", account: data });
    } else {
      res.json({ status: "failed" });
    }
  },
};
