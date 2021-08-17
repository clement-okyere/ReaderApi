/**
 * 
 * @param {user gender (string)} gender 
 * @returns {db equivalent gender}
 */
//resolve user friendly gender name to db gender equivalent
export const resolveGender = (gender) => {
  gender = gender.toLowerCase();
  let dbGender;
  switch (gender) {
    case "male":
      dbGender = 1;
      break;

    case "female":
      dbGender = 2;
      break;

    case "unknown":
      dbGender = 0;
      break;

    default:
      throw new Error("unacceptable gender!");
  }

  return dbGender;
};
