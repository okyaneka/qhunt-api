import UserPublic from "~/models/UserPublic";
import UserChallengeService from "../UserChallengeService";

export const sync = async (code: string) => {
  return UserPublic.findOneAndUpdate(
    { code, deletedAt: null },
    { $setOnInsert: { code }, $set: { lastAccessedAt: Date.now() } },
    { new: true, upsert: true }
  );
};

export const verify = async (code: string) => {
  const user = await UserPublic.findOne({ code, deletedAt: null });
  if (!user) throw new Error("code invalid");
  return user.toObject();
};

const UserPublicService = { sync, verify };

export default UserPublicService;
