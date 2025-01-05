import Challenge, {
  ChallengeListParams,
  ChallengePayload,
} from "~/models/Challenge";
import StageService from "../StageService";

export const list = async (params: ChallengeListParams) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.stageId) filter["stage.id"] = params.stageId;
  const list = await Challenge.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Challenge.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: list.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const create = async (payload: ChallengePayload) => {
  const stage = await StageService.detail(payload.stageId);

  const item = await Challenge.create({
    ...payload,
    stage: {
      id: stage.id,
      name: stage.name,
    },
  });

  return item.toObject();
};

export const detail = async (id: string) => {
  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};

export const update = async (id: string, payload: ChallengePayload) => {
  const stage = await StageService.detail(payload.stageId);

  const item = await Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: {
        ...payload,
        stage: {
          id: stage.id,
          name: stage.name,
        },
      },
    },
    { new: true }
  );

  if (!item) throw new Error("item not found");

  return item.toObject();
};

export const updateContent = async (id: string, content: string[]) => {
  const item = await Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { content } }
  );
  if (!item) throw new Error("challenge not found");
  return item;
};

export const _delete = async (id: string) => {
  const item = await Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("item not found");

  return item.toObject();
};

const ChallengeService = {
  list,
  create,
  detail,
  update,
  delete: _delete,
  updateContent,
};

export default ChallengeService;
