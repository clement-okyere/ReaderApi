import books from "../route/book";
import category from "../routes/category";
import express from "express";

const routes = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/books", books);
  app.use("/api/categories", category);
};
export default routes;