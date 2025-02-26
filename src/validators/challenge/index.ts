import Joi from "joi";
import validator, {
  DefaultListParamsFields,
  FeedbackValidator,
} from "~/helpers/validator";
import {
  ChallengeForeign,
  ChallengeListParams,
  ChallengePayload,
  ChallengeSettings,
  ChallengeSettingsForeign,
} from "qhunt-lib";
import { CHALLENGE_STATUS, CHALLENGE_TYPES } from "qhunt-lib/constants";

export const ChallengeListParamsValidator =
  validator.generate<ChallengeListParams>({
    ...DefaultListParamsFields,
    type: validator.string().valid(...Object.values(CHALLENGE_TYPES)),
    stageId: validator.string().allow(null, ""),
  });

export const ChallengeSettingsValidator = validator.generate<ChallengeSettings>(
  {
    clue: validator.string({ defaultValue: "" }),
    duration: validator.number({ defaultValue: 0 }),
    type: validator
      .string({ required: true })
      .valid(...Object.values(CHALLENGE_TYPES)),
    feedback: FeedbackValidator,
  }
);

export const ChallengeForeignValidator = validator.generate<ChallengeForeign>({
  id: validator.string({ required: true }),
  name: validator.string({ required: true }),
  order: validator.number({ defaultValue: null }),
  storyline: validator.array(Joi.string(), { defaultValue: [] }),
});

export const ChallengeSettingsForeignValidator =
  validator.generate<ChallengeSettingsForeign>({
    duration: validator.number({ allow: 0 }),
    type: validator
      .string({ required: true })
      .valid(...Object.values(CHALLENGE_TYPES)),
  });

export const ChallengePayloadValidator = validator.generate<ChallengePayload>({
  name: validator.string({ required: true }),
  storyline: validator.array(validator.string()).default([]),
  stageId: validator.string().allow(null, ""),
  status: validator
    .string({ required: true, defaultValue: CHALLENGE_STATUS.Draft })
    .valid(...Object.values(CHALLENGE_STATUS)),
  settings: ChallengeSettingsValidator.required(),
});

const ChallengeValidator = {
  ChallengeForeignValidator,
  ChallengeListParamsValidator,
  ChallengePayloadValidator,
  ChallengeSettingsForeignValidator,
  ChallengeSettingsValidator,
};

export default ChallengeValidator;
