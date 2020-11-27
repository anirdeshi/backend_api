const express = require("express");
const cors = require("cors");

// fetch port from environment
require("dotenv").config();

const connectDB = require("./db/mongo");

const app = express();
const allRouting = require("./routing/app_routing");

app.use(express.json());
app.use(cors());

connectDB();
// all routes defined through below file
app.use(allRouting);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
