import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const bookDbPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


/**
 * 
 * @param {pg database pool} pool 
 * @param {sql query} sql 
 * @param {query parameters} variables 
 * @returns 
 */
export const cquery = async (pool, sql, variables = null) => {
  const client = await pool.connect();
  let res;
  if (variables !== null && variables.constructor === Array) {
    const query = {
      text: sql,
      values: variables,
    };
    res = await client.query(query, variables);
  } else {
    res = await client.query(sql);
  }

  //releases databases resources after fetching data
  client.release();
  const data = res.rows || [];
  return data;
};
