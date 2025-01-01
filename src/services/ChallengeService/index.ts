import Challenge, {
  ChallengeListParams,
  ChallengePayload,
} from "~/models/Challenge";
import Stage from "~/models/Stage";

export const list = async (params: ChallengeListParams) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.stageId) filter["stage.id"] = params.stageId;
  const list = await Challenge.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Challenge.countDocuments({ deletedAt: null });
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: list.map((item) => item.toJSON()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const create = async (payload: ChallengePayload) => {
  const stage = await Stage.findOne({
    _id: payload.stageId,
    deletedAt: null,
  }).catch(() => {});

  if (!stage) return;

  const item = await Challenge.create({
    ...payload,
    stage: {
      id: stage.id,
      name: stage.name,
    },
  });

  return item;
};

export const detail = async (id: string) => {
  return Challenge.findOne({ _id: id, deletedAt: null }).catch(() => {});
};

export const update = async (id: string, payload: ChallengePayload) => {
  return Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: payload },
    { new: true }
  ).catch(() => {});
};

export const _delete = async (id: string) => {
  return Challenge.updateOne(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } }
  ).catch(() => {});
};

const ChallengeService = { list, create, detail, update, delete: _delete };

export default ChallengeService;
