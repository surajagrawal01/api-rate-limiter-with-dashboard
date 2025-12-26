import { weatherRouter } from "../apis/weather/bin/controller";
import { middleware } from "../middleware/rateLimiter";

export const routerApi = require("express").Router();

routerApi.use("/weather", middleware, weatherRouter);