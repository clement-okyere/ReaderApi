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
}

export default BookRepository;
