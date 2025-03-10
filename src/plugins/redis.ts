import { RedisOptions, redis } from "qhunt-lib/plugins/redis";
import { env } from "~/configs";

const options: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  retryStrategy: (times) => Math.min(times * 50, 2000),
};

redis.init(options);

export default redis;
