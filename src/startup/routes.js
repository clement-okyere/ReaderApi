import books from "../route/book";
import category from "../route/category";
import user from "../route/user";
import error from "../middleware/error";
import express from "express";

const routes = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/books", books);
  app.use("/api/categories", category);
  app.use("/api/users", user);
  app.use(error);
};
export default routes;