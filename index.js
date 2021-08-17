import  "express-async-errors"; //module to handle unhandled async errors
import express from "express";
import winston from "winston";
import swaggerDocs from "./src/startup/documentation";
import routes from "./src/startup/routes";
import logger from "./src/startup/logger";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//test route to check if application is runing
app.get("/", (req, res) => {
    res.send("Book Api running successfully!!!")
})

logger();
swaggerDocs(app);
routes(app);


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  winston.info(`Book Api listening on port ${PORT}`);
});

export default server;

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });