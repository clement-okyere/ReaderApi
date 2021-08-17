import winston from "winston";

const logger = () => {
  winston.add(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    })
  );
};

export default logger;
