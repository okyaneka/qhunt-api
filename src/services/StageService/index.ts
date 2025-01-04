import Stage, { StageListParams, StagePayload } from "~/models/Stage";

export const list = async (params: StageListParams) => {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    name: { $regex: params.search, $options: "i" },
  };
  const items = await Stage.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Stage.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const create = async (payload: StagePayload) => {
  const item = await Stage.create(payload);
  return item.toObject();
};

export const detail = async (id: string) => {
  const item = await Stage.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};

export const update = async (id: string, payload: StagePayload) => {
  const item = await Stage.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: payload },
    { new: true }
  );

  if (!item) throw new Error("item not found");

  return item.toObject();
};

export const _delete = async (id: string) => {
  const item = await Stage.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("item not found");
  return item;
};

const StageService = { list, create, detail, update, delete: _delete };

export default StageService;
