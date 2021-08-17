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
}

export default BookRepository;
