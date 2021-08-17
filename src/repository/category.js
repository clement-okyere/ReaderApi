import { bookDbPool } from "../utils/dbConn";
import { cquery } from "../utils/dbConn";

class CategoryRepository {
  static async getCategories() {
    //use a recursive query to get the category list
    const queryString = `
                WITH RECURSIVE tree AS (
                                SELECT
                                      id 
                                    , iconcolor
                                    , iconurl
                                    , "name" as name 
                                    , description
                                    , COALESCE(parent_id , 0) as parent_id 
                                    , listorder
                                FROM category
                                WHERE COALESCE(parent_id , 0) = 0
                                union 
                                SELECT
                                    c.id 
                                    , c.iconcolor 
                                    , c.iconurl 
                                    , (tree.name  || '/' || c.name)::varchar(255) AS name
                                    , c.description 
                                    , COALESCE(c.parent_id , 0) as parent_id 
                                    , c.listorder 
                                FROM tree
                                JOIN 
                                category c  ON tree.id = c.parent_id 
                            )
                            
                            SELECT * FROM tree order by name, listorder
        `;

    let result = await cquery(bookDbPool, queryString);
    return result;
  }
}

export default CategoryRepository;
