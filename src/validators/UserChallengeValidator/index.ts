import schema from "~/helpers/schema";
import { UserChallengeForeign } from "~/models/UserChallenge";

export const UserChallengeForeignValidator =
  schema.generate<UserChallengeForeign>({
    id: schema.string({ required: true }),
    challengeId: schema.string({ required: true }),
    name: schema.string({ required: true }),
  });
