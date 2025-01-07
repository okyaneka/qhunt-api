import db from "~/helpers/db";
import StageService from "../StageService";
import UserChallengeService from "../UserChallengeService";
import UserPublicService from "../UserPublicService";
import UserStage, {
  UserStage as IUserStage,
  UserStageListParams,
} from "~/models/UserStage";
import { StageForeignValidator } from "~/validators/StageValidator";
import { UserChallenge } from "~/models/UserChallenge";
import { UserPublicForeignValidator } from "~/validators/UserPublicValidator";

export const setup = async (
  code: string,
  stageId: string,
  defaultChallenge?: string
): Promise<IUserStage | UserChallenge> => {
  const userStageExists = await UserStage.findOne({
    "userPublic.code": code,
    "stage.id": stageId,
    deletedAt: null,
  });
  if (userStageExists) return userStageExists.toObject();

  const userPublicData = await UserPublicService.verify(code);
  const stageData = await StageService.detail(stageId);

  // FIXME: nanti akan ada validasi di sini. lihat juga di setup challenge dan beberapa anak2 nya

  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    { convert: true, abortEarly: false, stripUnknown: true }
  );

  const stage = await StageForeignValidator.validateAsync(stageData, {
    convert: true,
    abortEarly: false,
    stripUnknown: true,
  });

  const userStageData = await UserStage.create({ userPublic, stage });

  const contents = stageData.contents.map((challengeId) =>
    UserChallengeService.setup(
      code,
      challengeId,
      defaultChallenge == challengeId
    )
  );
  const contentsData = await Promise.all(contents);
  userStageData.contents = contentsData.map((item) => item.id);
  await userStageData.save();

  if (defaultChallenge) {
    const data = contentsData.find(
      (item) => item.challenge.id == defaultChallenge
    );
    if (!data) throw new Error("challenge not found");
    return data;
  }

  return userStageData.toObject();
};

export const list = async (params: UserStageListParams, TID: string) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID,
  };
  if (params.status) filter.status = params.status;
  const items = await UserStage.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await UserStage.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const detail = async (id: string, TID: string) => {
  const item = await UserStage.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID,
  });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};

const UserStageService = { setup, list, detail };

export default UserStageService;
