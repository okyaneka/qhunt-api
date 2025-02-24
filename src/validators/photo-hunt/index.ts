import validator from "~/helpers/validator";
import { PhotoHuntPayload } from "qhunt-lib/types";

export const PhotoHuntPayloadValidator = validator.array(
  validator.generate<PhotoHuntPayload>({
    id: validator.string(),
    hint: validator.string({ required: true }),
    score: validator.number({ required: true }),
    feedback: validator.string({ defaultValue: "" }),
  }),
  { required: true }
);

const PhotoHuntValidator = { PhotoHuntPayloadValidator };

export default PhotoHuntValidator;
