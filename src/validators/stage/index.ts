import Joi from "joi";
import validator from "~/helpers/validator";
import { StageForeign, StageListParams, StagePayload } from "qhunt-lib";
import { DefaultListParamsFields, PeriodeValidator } from "~/helpers/validator";
import { STAGE_STATUS } from "qhunt-lib/constants";

export const StageSettingsValidator = validator.generate<
  StagePayload["settings"]
>({
  unlockAll: validator.boolean({ defaultValue: false }),
  canDoRandomChallenges: validator.boolean({ defaultValue: false }),
  canStartFromChallenges: validator.boolean({ defaultValue: false }),
  periode: PeriodeValidator.allow(null),
});

export const StageListParamsValidator = validator.generate<StageListParams>({
  ...DefaultListParamsFields,
  status: validator
    .string({ allow: null })
    .valid(...Object.values(STAGE_STATUS)),
});

export const StagePayloadValidator = validator.generate<StagePayload>({
  name: validator.string({ required: true }),
  prologue: validator.array(Joi.string()).default([]),
  epilogue: validator.array(Joi.string()).default([]),
  storyline: validator.array(Joi.string()).default([]),
  contents: validator.array(Joi.string()).default([]),
  status: validator
    .string({ required: true })
    .valid(...Object.values(STAGE_STATUS)),
  settings: StageSettingsValidator.required(),
});

export const StageForeignValidator = validator.generate<StageForeign>({
  id: validator.string({ required: true }),
  name: validator.string({ required: true }),
  storyline: validator.array(Joi.string(), { defaultValue: [] }),
  settings: validator.generate<StageForeign["settings"]>({
    periode: PeriodeValidator.allow(null),
  }),
});

const StageValidator = {
  StageSettingsValidator,
  StageListParamsValidator,
  StagePayloadValidator,
  StageForeignValidator,
};

export default StageValidator;
