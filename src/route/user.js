import { Router } from "express";
import winston from "winston";
import UserRepository from "../repository/user";
const route = Router();

/**
 * A user
 * @typedef {object} User
 * @property {string} id - User id
 * @property {string} gender - Gender
 * @property {number} age - User age
 * @property {string} createdat - Book create date
 * @property {string} updatedat - Book last updated date
 */

/**
 * GET /api/users
 * @summary Endpoint to get paginated list of users
 * @tags users
 * @param {string} page.query - page number
 * @param {string} limit.query - page limit
 * @param {string} gender.query - gender ("male", "female", "unknown")
 * @param {number} agestart.query - age range start
 * @param {number} ageend.query -  age range end
 * @param {string} sortby.query -  sort by createdat or updatedat
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "id": "235b68e4-5b16-4a25-b731-45c7e67c351e",
 *     "gender": "male",
 *     "age": 20,
 *     "createdat": "2021-06-14T17:49:07.000Z",
 *     "updatedat": "2021-06-14T17:49:10.000Z",
 *   }
 * ]
 */

route.get("/", async (req, res) => {
  //set default page to 1 and limit 100
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  winston.info("Getting paginated list of users");
  //destructure query params
  const { gender, agestart, ageend, sortby } = req.query;

  const users = await UserRepository.getUsers(
    limit,
    offset,
    gender,
    agestart,
    ageend,
    sortby
  );
  res.send(users);
});


/**
 * GET /api/users/{id}
 * @summary Endpoint to get user by id
 * @tags users
 * @param {string} id.path.required - user id
 * @return {User} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "id": "235b68e4-5b16-4a25-b731-45c7e67c351e",
 *     "gender": "Cesc Fàbregas",
 *     "age": "George McClean",
 *     "createdat": "2021-06-14T17:49:07.000Z",
 *     "updatedat": "2021-06-14T17:49:10.000Z",
 *   }
 * ]
 */
route.get("/:id", async (req, res) => {
 
  //destructure route params
    const { id } = req.params;
    
  winston.info(`Getting data for user with id - ${id}`); 
  const user = await UserRepository.getUserById(id);
  
    if (!user.length) {
        return res.status(404).send(`Book with id ${id} does not exist`);
  }

  res.send(user);
});

export default route;
