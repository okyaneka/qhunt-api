import { IdName, Timestamps } from "~/models";

export enum UserPublicGender {
  Male = "male",
  Female = "female",
  Panda = "panda",
}

export interface UserPublicPayload {
  name: string;
  gender: UserPublicGender | null;
  dob: Date | null;
  phone: string;
}

export interface UserPublic extends UserPublicPayload, Timestamps {
  id: string;
  code: string;
  user: IdName;
  lastAccessedAt: Date;
}
