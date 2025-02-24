import Joi from "joi";
import validator from "~/helpers/validator";
import {
  QR_CONTENT_TYPES,
  QR_STATUS,
  QrContent,
  QrDeleteBulkPayload,
  QrGeneratePayload,
  QrListParams,
  QrLocation,
  QrUpdatePayload,
} from "qhunt-lib/types";
import { DefaultListParamsFields } from "~/helpers/validator";

export const QrListParamsValidator = validator.generate<QrListParams>({
  ...DefaultListParamsFields,
  code: validator.string({ allow: "" }),
  status: validator.string({ allow: "" }).valid(...Object.values(QR_STATUS)),
  hasContent: validator.boolean({ defaultValue: null }),
});

export const QrGeneratePayloadValidator = validator.generate<QrGeneratePayload>(
  {
    amount: validator.number({ required: true }),
  }
);

const QrContentValidator = validator.generate<QrContent>({
  refId: validator.string({ required: true }),
  type: validator
    .string({ required: true })
    .valid(...Object.values(QR_CONTENT_TYPES)),
});

const QrLocationValidator = validator.generate<QrLocation>({
  label: validator.string({ required: true, allow: "" }),
  longitude: validator.number({ required: true }),
  latitude: validator.number({ required: true }),
});

export const QrUpdatePayloadValidator = validator.generate<QrUpdatePayload>({
  status: validator
    .string({ required: true })
    .valid(...Object.values(QR_STATUS)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null),
});

export const QrDeleteBulkPayloadValidator =
  validator.generate<QrDeleteBulkPayload>({
    ids: validator.array(Joi.string(), { required: true }),
  });

const QrValidator = {
  QrListParamsValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator,
};

export default QrValidator;
