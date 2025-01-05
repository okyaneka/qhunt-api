import CryptoJS from "crypto-js";
import Qr, {
  QrContentType,
  QrListQuery,
  QrPayload,
  QrStatus,
  QrUpdatePayload,
} from "~/models/Qr";
import ChallengeService from "../ChallengeService";
import StageService from "../StageService";
import UserChallengeService from "../UserChallengeService";

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
  const { content, ...value } = payload as any;

  const item = await Qr.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");

  if (content?.type) {
    switch (content.type) {
      case QrContentType.Challenge:
        await ChallengeService.delete(content.refId);
        value.content = content;
        break;
      case QrContentType.Stage:
        await StageService.detail(content.refId);
        value.content = content;
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

export const verify = async (code: string, TID: string) => {
  const item = await Qr.findOne({
    code,
    deletedAt: null,
    status: QrStatus.Publish,
  });

  if (!item) throw new Error("qr code invalid");

  switch (item.content?.type) {
    case QrContentType.Stage:
      // StageService.setup()
      return;
    case QrContentType.Challenge:
      const userChallenge = await UserChallengeService.sync(
        TID,
        item.content.refId
      );
      return { type: QrContentType.Challenge, refd: userChallenge.id };

    default:
      throw new Error("invalid qr content");
  }
};

const QrService = {
  generate,
  list,
  detail,
  update,
  delete: _delete,
  deleteMany,
  verify,
};

export default QrService;
