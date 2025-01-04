import UserPublic from "~/models/UserPublic";

export const sync = async (code: string) => {
  return UserPublic.findOneAndUpdate(
    { code },
    { $setOnInsert: { code }, $set: { lastAccessedAt: Date.now() } },
    { new: true, upsert: true }
  );
};

const UserServicePublic = { sync };

export default UserServicePublic;
