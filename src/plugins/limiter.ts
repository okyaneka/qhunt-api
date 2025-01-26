import RateLimit from "express-rate-limit";
import { response } from "qhunt-lib/helpers";
import { env } from "~/configs";

const limiter = () =>
  RateLimit({
    windowMs: env.THROTTLE_TIME * 60 * 1e3,
    max: env.THROTTLE_COUNT,
    message: response.error(
      {},
      "Too many request, please try again later.",
      429
    ),
  });

export default limiter;
