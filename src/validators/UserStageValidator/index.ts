import schema from "~/helpers/schema";
import { UserStageForeign } from "~/models/UserStage";

export const UserStageForeignValidator = schema.generate<UserStageForeign>({
  id: schema.string({ required: true }),
  stageId: schema.string({ required: true }),
  name: schema.string({ required: true }),
});
