import dotenv from "dotenv";
import { Response } from "express";

global.NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === undefined) {
  dotenv.config({
    path: "../../secrets.env",
    debug: true,
  });
}

global.dlog = function (message, ...params) {
  if (NODE_ENV === "local") {
    console.log(message, ...params);
  }
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * res.status(status).json({message:message + error})
 * @param {Response} res
 * @param {Integer} status
 * @param {String} message
 * @param {String} error
 */
export function commonErrorMessage(
  res: Response,
  status: number = 500,
  message: string = "rip bruh error",
  error: string = "an error has occurred"
) {
  res
    .status(status)
    .json({ message: `${message}\n${NODE_ENV === "local" ? error : ""}` });
}
