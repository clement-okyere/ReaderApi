import  "express-async-errors"; //module to handle unhandled async errors
import express from "express";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();


const app = express();

//test route to check if application is runing
app.get("/", (req, res) => {
    res.send("Book Api running successfully!!!")
})

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  winston.info(`Book Api listening on port ${PORT}`);
});

export default server;