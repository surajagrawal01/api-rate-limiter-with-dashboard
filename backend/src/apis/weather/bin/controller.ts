export const weatherRouter = require("express").Router();
import { Request, Response, NextFunction } from "express";

weatherRouter.get("/", async (req: Request, res: Response) => {
    try {
        const weather = {
            temp: '23',
            unit: 'degree celsius'
        }
        res.json(weather);
    } catch (err) {
        console.log(err)
    }
})
