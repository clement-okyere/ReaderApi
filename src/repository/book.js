import { bookDbPool } from "../utils/dbConn";
import { cquery } from "../utils/dbConn";

class BookRepository {
  static async getBooks(limit, offset) {
    const queryString = `
          SELECT uuid, title, author, language
          FROM book
          ORDER BY id 
          LIMIT $1 OFFSET $2;
        `;

    let result = await cquery(bookDbPool, queryString, [limit, offset]);
    return result;
  }

  static async getBookById(bookId) {
    const queryString = `
        SELECT uuid FROM book
                 WHERE uuid = $1
        `;
    let result = await cquery(bookDbPool, queryString, [bookId]);
    return result;
  }

  static async getUniqueClients(bookId) {
    const queryString = `
         SELECT COUNT(distinct (client_id))
             from log
            WHERE book_id = $1
        `;

    let result = await cquery(bookDbPool, queryString, [bookId]);
    return result;
  }

  static async getUniqueUsers(bookId) {
    const queryString = `
         SELECT COUNT(distinct (user_id)) FROM log 
            WHERE book_id =  $1
            and user_id <> ''
        `;

    let result = await cquery(bookDbPool, queryString, [bookId]);
    return result;
  }

  static async getClientCountrySummary(bookId) {
    const queryString = `
        SELECT dc."name" as country, count(client_id) AS count FROM log l
            JOIN dim_country dc
            ON l.country = dc.country_key
            WHERE book_id = $1
            group by dc."name"  
        `;
    let result = await cquery(bookDbPool, queryString, [bookId]);
    return result;
  }
}

export default BookRepository;
