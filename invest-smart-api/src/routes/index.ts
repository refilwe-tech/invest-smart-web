const userRouter = require("./user.router");
const countRouter = require("./count.router");

const express = require("express");
const routes = express.Router();


routes.use("/", userRouter);
routes.use("/", countRouter);

module.exports = routes