import { Router } from "express";
import winston from "winston";
import BookRepository from "../repository/book";

const route = Router();

/**
 * A book
 * @typedef {object} Book
 * @property {string} uuid - Book id
 * @property {string} title - Book title
 * @property {string} author - Book Author
 * @property {string} language - Book Language
 */

/**
 * GET /api/books
 * @summary Endpoint to get paginated list of books
 * @tags books
 * @param {string} page.query - page number
 * @param {string} limit.query - page limit
 * @return {array<Book>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "uuid": "235b68e4-5b16-4a25-b731-45c7e67c351e",
 *     "title": "Cesc Fàbregas",
 *     "author": "George McClean",
 *     "language": "en"
 *   }
 * ]
 */

route.get("/", async (req, res) => {
  //set default page to 1 and limit 100
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let offset = (page - 1) * limit;

  winston.info("Getting all book data");
  const books = await BookRepository.getBooks(limit, offset);
  res.send(books);
});



export default route;
