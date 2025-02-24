// src/@types/express/index.d.ts
import "express";
import { User } from "~/models/User";

declare global {
  namespace Express {
    interface Locals {
      user?: Pick<User, "id" | "role">;
      TID?: string;
      TOKEN?: string;
    }
  }
}
