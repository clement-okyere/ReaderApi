import books from "../route/book";
import express from "express";

const routes = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/books", books);
};
export default routes;