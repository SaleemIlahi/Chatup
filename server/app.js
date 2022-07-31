const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./api/routes/userRouter.js");
const { configDB } = require("./api/db/configDB.js");
const { errorHandler } = require("./api/middlewares/errorHandler.js");

const app = express();
dotenv.config();

app.use(express.json());

// Connecting DB
configDB();

app.use("/", userRouter);
app.use(errorHandler);

port = process.env.PORT;

app.listen(port, console.log(`Server listening at ${port}`));
