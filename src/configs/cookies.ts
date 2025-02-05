import { CookieOptions } from "express";

const options: CookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3),
  path: "/",
  sameSite: "none",
  secure: true,
  domain: ".kulooky.my.id",
  httpOnly: true,
};

const cookies = {
  TID: "tid",
  options,
} as const;

export default cookies;
