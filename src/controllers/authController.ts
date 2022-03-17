import { Request, Response, NextFunction } from "express";
import knex from "../database";
import status from 'http-status';
import utils from "../utils/index";
const jwt = require("jsonwebtoken");


export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            username,
            password
        } = req.body

        const user = await knex
            .select("password", "username", "id")
            .from("users")
            .where({ username })
            .first();
        const verify = await utils.comparePassword(password, user.password);

        if (!verify) throw new Error("Wrong Password");

        const data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            token: jwt.sign(
                {
                    user_id: user.id,
                    exp: Date.now() / 1000 + 86400,
                },
                process.env.TOKEN_SECRET
            ),
        }
        res.locals.data = data
        res.locals.status = status.OK
    } catch (error) {
        console.log(error);
        res.locals.status = status.INTERNAL_SERVER_ERROR;
        res.locals.message = status[status.INTERNAL_SERVER_ERROR];
        next();
    }
};
