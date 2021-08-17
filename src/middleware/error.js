import winston from "winston";

const error = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Oops! An error occurred");
};

export default error;
