const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./utils/logger");
require("dotenv").config();
require("./config/dbConfig");
const errorHandler = require("./middleware/errorHandler");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");
const orderRoute = require("./routes/orders");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/auth", authRoute);

// global error handler
app.use(errorHandler);

const APP_PORT = process.env.APP_PORT;

//listening to port
app.listen(process.env.APP_PORT, () => {
  logger.info(`APP IS RUNNING ON PORT : ${APP_PORT}`);
});
