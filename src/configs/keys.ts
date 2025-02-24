import { ValueOf } from "qhunt-lib";

const KEYS = {
  UserUpdate: "user-update",
} as const;

export type Keys = ValueOf<typeof KEYS>;

export default KEYS;
