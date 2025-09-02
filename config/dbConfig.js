"use strict";
const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();
logger.info("MONGO_URL:", process.env.MONGO_URL);

const DB = process.env.MONGO_URL;
mongoose
  .connect(DB)
  .then(() => {
    logger.info("connected to database");
  })
  .catch((error) => {
    logger.error("error connecting to database", error);
  });


