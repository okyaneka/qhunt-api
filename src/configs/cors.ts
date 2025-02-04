import config from "cors";
import env from "./env";

const origins = env.APP_URL.split(",").filter((origin) => origin.trim());
const local = /^https?:\/\/localhost:\d+$/;

const cors = () => {
  return config({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin) || local.test(origin))
        return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
};

export default cors;
