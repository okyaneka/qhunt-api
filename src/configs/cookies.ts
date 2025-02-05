import { CookieOptions } from "express";

const options = (domain?: string): CookieOptions => {
  return {
    // for 30 days
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3),
    path: "/",
    sameSite: "none",
    secure: true,
    domain: domain,
    httpOnly: true,
  };
};

const cookies = {
  TID_API: "TID_API",
  TID_SOCKET: "TID_SOCKET",
  options,
} as const;

export default cookies;
