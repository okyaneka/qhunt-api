import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,

  MONGO_URI: process.env.MONGO_URI || "",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",

  THROTTLE_TIME: Number(process.env.THROTTLE_TIME) || 1,
  THROTTLE_COUNT: Number(process.env.THROTTLE_COUNT) || 5,

  JWT_SECRET: process.env.JWT_SECRET || "",

  APP_URL: process.env.APP_URL || /^https?:\/\/localhost:\d+$/,
};

export default env;
