const express = require("express");

const userRoute = require("../routes/user");
const app = express();

app.use("/api/user", userRoute);

module.exports = app;
