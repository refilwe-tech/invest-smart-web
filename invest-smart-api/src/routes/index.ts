const userRouter = require("./user.router");
const countRouter = require("./count.router");
const investmentRouter = require("./investments.router");

const express = require("express");
const routes = express.Router();


routes.use("/", userRouter);
routes.use("/", countRouter);
routes.use("/", investmentRouter)

module.exports = routes