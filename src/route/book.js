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
 * @return {string} 500 - internal server error
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


/**
 * ClientCountrySummary
 * @typedef {object} ClientCountrySummary
 * @property {number} country - country
 * @property {number} count - number of unique clients that have read the book from the country

 */

/**
 * Book Statistics
 * @typedef {object} BookStatistics
 * @property {number} uniqueUsers - Unique users that have read the book
 * @property {number} uniqueClients - Unique clients that have read the book
 * @property {array<ClientCountrySummary>} clientCountrySummary - Book Author

 */

/**
 * GET /api/books/{id}/statistics
 * @summary Endpoint to get book statistics by id
 * @tags books
 * @param {string} id.path.required - book id
 * @return {BookStatistics} 200 - success response - application/json
 * @return {string} 404 - book not found response
 * @return {string} 500 - internal server error
 * @example response - 200 - success response example
 *   {
 *     "uniqueUsers": 2,
 *     "uniqueClients": 5,
 *     "clientCountrySummary": [{
 *        "country": "GH",
 *        "count": 5
 *       }]
 *   }
 */

route.get("/:id/statistics", async (req, res) => {

  const bookId = req.params.id;
  winston.info(`Getting book statistic data for book with id - ${bookId}`);

  //check if book exists
   const book = await BookRepository.getBookById(bookId);

  if (!book.length) {
     winston.info(`Book with id ${bookId} does not exist`);
     return res.status(404).send(`Book with id ${bookId} does not exist`);
   }
  

  let bookStatistics = {};

    
  bookStatistics.uniqueClients = await BookRepository
        .getUniqueClients(bookId);
    
  bookStatistics.uniqueUsers = await BookRepository.getUniqueUsers(bookId);
    
  bookStatistics.clientCountrySummary = await BookRepository
                                          .getClientCountrySummary(bookId);
  res.send(bookStatistics);
});

export default route;
