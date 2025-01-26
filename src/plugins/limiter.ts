import RateLimit from "express-rate-limit";

const limiter = () =>
  RateLimit({
    windowMs: 60 * 1e3,
    max: 30,
  });

export default limiter;
