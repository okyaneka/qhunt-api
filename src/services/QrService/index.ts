import CryptoJS from "crypto-js";
import { ENV } from "~/configs";
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
    list: items.map((item) => item.toJSON()),
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
  return Qr.findOne({ _id: id, deletedAt: null }).catch(() => {});
};

export const detailPublic = async (code: string) => {
  const item = await Qr.findOne({ code, deletedAt: null }).catch(() => {});
  if (!item) return;
  return item.toObject();
  // const url = new URL(ENV.APP_URL)
  // url.pathname = `/public/${code}`
  // return {item
  //   redirect: "https://kemana.co",
  // };
};

export const update = async (id: string, payload: QrUpdatePayload) => {
  const { content, ...rest } = payload;
  const value: Partial<IQr> = rest;

  if (content?.type) {
    switch (content.type) {
      case QrContentType.Challenge:
        const challengeRef = await Challenge.findOne({
          _id: content.refId,
          deletedAt: null,
        }).catch(() => {
          console.log("ref not found");
        });
        if (!challengeRef) return;
        value.content = content;
        break;

      default:
        break;
    }
  }

  return Qr.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: value },
    { new: true }
  ).catch(() => {});
};

export const _delete = async (id: string) => {
  return Qr.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() }
  ).catch(() => {});
};

export const deleteMany = async (ids: string[]) => {
  return Qr.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
    },
    { $set: { deletedAt: new Date() } }
  ).catch(() => {});
};

const QrService = {
  generate,
  list,
  detail,
  detailPublic,
  update,
  delete: _delete,
  deleteMany,
};

export default QrService;
