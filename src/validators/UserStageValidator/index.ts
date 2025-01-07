import schema from "~/helpers/schema";
import {
  UserStageForeign,
  UserStageListParams,
  UserStageStatus,
} from "~/models/UserStage";
import { DefaultListParamsFields } from "..";

export const UserStageForeignValidator = schema.generate<UserStageForeign>({
  id: schema.string({ required: true }),
  stageId: schema.string({ required: true }),
  name: schema.string({ required: true }),
});

export const UserStageListParamsValidator =
  schema.generate<UserStageListParams>({
    ...DefaultListParamsFields,
    status: schema
      .string({ allow: "" })
      .valid(...Object.values(UserStageStatus)),
  });
