import LogMiddleware from "./LogMiddleware";
import ErrorMiddleware from "./ErrorMiddleware";
import AuthMiddleware from "./AuthMiddleware";

export { LogMiddleware, ErrorMiddleware, AuthMiddleware };

const middlewares = { LogMiddleware, ErrorMiddleware, AuthMiddleware };

export default middlewares;
