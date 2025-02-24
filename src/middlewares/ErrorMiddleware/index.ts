import fs from "fs";
import path from "path";
import { NextFunction, ErrorRequestHandler, Response, Request } from "express";
import { response } from "qhunt-lib/helpers";

const logPath = path.join(__dirname, "../../../logs/error.log");

const logsDir = path.dirname(logPath);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const ErrorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  const logMessage = `[${timestamp}] ${method}: ${path} . ${err.stack?.toString()}\n`;
  console.log(logMessage);
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });

  console.error(err.stack);
  res.status(400).json(response.error({}, err.message, 400));
};

export default ErrorMiddleware;
