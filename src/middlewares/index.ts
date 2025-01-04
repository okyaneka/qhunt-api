import LogMiddleware from "./LogMiddleware";
import ErrorMiddleware from "./ErrorMiddleware";
import AuthMiddleware from "./AuthMiddleware";
import ValidationMiddleware from "./ValidationMiddleware";
import CookiesMiddleware from "./CookiesMiddleware";

export {
  AuthMiddleware,
  CookiesMiddleware,
  ErrorMiddleware,
  LogMiddleware,
  ValidationMiddleware,
};

const middlewares = {
  AuthMiddleware,
  CookiesMiddleware,
  ErrorMiddleware,
  LogMiddleware,
  ValidationMiddleware,
};

export default middlewares;
