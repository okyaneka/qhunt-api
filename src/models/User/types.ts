import { DefaultListParams } from "~/validators";
import { Timestamps } from "..";

export enum UserRole {
  Private = "private",
  Public = "public",
}

export interface UserListQuery extends DefaultListParams {
  role: UserRole | null;
}

export interface UserPayload {
  email: string;
  password: string;
}

export interface User extends Timestamps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
