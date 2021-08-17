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

/**
 * 
 * @param { main array } arr 
 * @param {parent id (numeric)} parent 
 * @returns 
 */
//recursively generate nested subcategories from category tree
export const getNestedChildren = (arr, parent) => {
  var out = [];
  for (var i in arr) {
    if (arr[i].parent_id == parent) {
      var children = getNestedChildren(arr, arr[i].id);

      if (children.length) {
        arr[i].subCategories = children;
      }
      out.push(arr[i]);
    }
  }
  return out;
}





