import { CookieOptions } from "express";
import env from "./env";

const options: CookieOptions = {
  // for 30 days
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3),
  path: "/",
  sameSite: "none",
  secure: true,
  domain: env.DOMAIN,
  httpOnly: true,
};

const cookies = {
  TID_API: "TID_API",
  TID_SOCKET: "TID_SOCKET",
  TOKEN: "TOKEN",
  options,
} as const;

export default cookies;
