import RateLimit from "express-rate-limit";
import { env } from "~/configs";

const limiter = () =>
  RateLimit({
    windowMs: env.THROTTLE_TIME * 1e3,
    max: env.THROTTLE_COUNT,
  });

export default limiter;
