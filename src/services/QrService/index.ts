import CryptoJS from "crypto-js";
import Challenge from "~/models/Challenge";
import Qr, {
  Qr as IQr,
  QrContentType,
  QrListQuery,
  QrPayload,
  QrStatus,
  QrUpdatePayload,
} from "~/models/Qr";

export const list = async (params: QrListQuery) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.status != null) filter.status = params.status;
  const items = await Qr.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Qr.countDocuments({ deletedAt: null });
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const generate = async (count: number) => {
  const items = new Array(count).fill({}).map<QrPayload>(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8))
      .toString(16)
      .padStart(8, "0");
    return {
      code: CryptoJS.SHA256(`${Date.now()}${salt}`).toString(CryptoJS.enc.Hex),
      status: QrStatus.Draft,
    };
  });

  return Qr.insertMany(items);
};

export const detail = async (id: string) => {
  const item = await Qr.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};

export const update = async (id: string, payload: QrUpdatePayload) => {
  const { content, ...rest } = payload;
  const value: Partial<IQr> = rest;

  const item = await Qr.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");

  if (content?.type) {
    switch (content.type) {
      case QrContentType.Challenge:
        const challengeRef = await Challenge.findOne({
          _id: content.refId,
          deletedAt: null,
        });
        if (!challengeRef) throw new Error("challenge not found");
        value.content = content;
        break;

      default:
        break;
    }
  }

  Object.assign(item, value);
  await item.save();
  return item.toObject();
};

export const _delete = async (id: string) => {
  const item = await Qr.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() }
  );
  if (!item) throw new Error("item not found");
  return item;
};

export const deleteMany = async (ids: string[]) => {
  const changed = await Qr.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
      status: QrStatus.Draft,
    },
    { $set: { deletedAt: new Date() } }
  );
  if (changed.modifiedCount == 0) throw new Error("item not found");
  return changed;
};

const QrService = {
  generate,
  list,
  detail,
  update,
  delete: _delete,
  deleteMany,
};

export default QrService;
