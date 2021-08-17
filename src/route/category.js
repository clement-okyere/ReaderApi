import { Router } from "express";
import winston from "winston";
import CategoryRepository from "../repository/category";
import { getNestedChildren } from "../utils/helper";

const route = Router();

/**
 * GET /api/categories
 * @summary Endpoint to get category tree
 * @tags categories
 * @return {object} 200 - success response - application/json
 */

route.get("/", async (req, res) => {
  winston.info("Getting all categories");
  const categories = await CategoryRepository.getCategories();
  const categoryTree = getNestedChildren(categories, 0);
  res.send(categoryTree);
});

export default route;
