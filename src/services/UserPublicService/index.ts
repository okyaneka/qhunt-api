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

export const setupStage = async (code: string, qrCode: string) => {};

export const setupChallenge = async (code: string, challengeId: string) => {
  const user = await UserPublic.findOne({ code, deletedAt: null });
  if (!user) throw new Error("user not found");

  /**
   * Step setups challenge
   *
   * 1. cek apakah udah ada existing challenge
   * 2. jika sudah get challenge
   * 3. jika belum create challenge
   * 4.
   */
  return UserChallengeService.sync(code, challengeId);

  // const qr = await QrService.verify(qrCode)
};

const UserPublicService = { sync, verify, setupStage, setupChallenge };

export default UserPublicService;
