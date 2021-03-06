import { bookDbPool } from "../utils/dbConn";
import { cquery } from "../utils/dbConn";
import { resolveGender } from "../utils/helper";

class UserRepository {
  static async getUsers(limit, offset, gender, ageStart, ageEnd, sortby) {
    let queryString = `
         SELECT id,
                usergender gender,
                 age,
                 createdat,
                 updatedat
                 FROM
                 wr_user wu
        `;

    let hasFilteredGenderAgeRange = false;
    if (gender && ageStart && ageEnd) {
      queryString += ` WHERE usergender = $1 and age between $2 and $3 `;
      hasFilteredGenderAgeRange = true;

      //resolve gender
      gender = resolveGender(gender);
    }

    if ((sortby = "createdat")) {
      queryString += ` ORDER BY createdat`;
    } else if ((sortby = "updatedat")) {
      queryString += ` ORDER BY updatedat`;
    }

    let result;

    if (hasFilteredGenderAgeRange) {
      queryString += ` LIMIT $4 OFFSET $5`;
      result = await cquery(bookDbPool, queryString, [
        gender,
        ageStart,
        ageEnd,
        limit,
        offset,
      ]);
    } else {
      queryString += ` LIMIT $1 OFFSET $2`;
      result = await cquery(bookDbPool, queryString, [limit, offset]);
    }

    return result;
  }

  static async getUserById(userId) {
    const queryString = `
        SELECT id,
                CASE
			        WHEN usergender = 0 THEN 'Unknown'
			        WHEN usergender = 1 THEN 'Male'
			        WHEN usergender = 2 THEN 'Female'
            END AS gender,
                 age,
                 createdat,
                 updatedat
                 from
                 wr_user wu
                 where id = $1
        `;

    let result = await cquery(bookDbPool, queryString, [userId]);
    return result;
  }
}

export default UserRepository;
