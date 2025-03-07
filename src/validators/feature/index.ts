import { validator } from "~/helpers";
import { FeaturePayload, S3Foreign } from "qhunt-lib";
import { FEATURE_STATUS, FEATURE_TYPES } from "qhunt-lib/constants";

const S3ForeignValidator = validator.generate<S3Foreign>({
  fileName: validator.string({ required: true }),
  fileSize: validator.number({ required: true }),
  fileUrl: validator.string({ required: true }),
});

export const FeaturePayloadValidator = validator.generate<
  Omit<FeaturePayload, "featuredImage">
>({
  title: validator.string({ required: true }),
  slug: validator.string({ required: true }),
  content: validator.string({ required: true }),
  status: validator
    .string({ required: true })
    .valid(...Object.values(FEATURE_STATUS)),
  type: validator
    .string({ required: true })
    .valid(...Object.values(FEATURE_TYPES)),
  questId: validator.string({
    required: false,
    allow: null,
    defaultValue: null,
  }),
  attachments: validator.array(S3ForeignValidator, { defaultValue: [] }),
});

const FeatureValidator = { FeaturePayloadValidator } as const;

export default FeatureValidator;
