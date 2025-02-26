import { validator } from "~/helpers";
import { LeaderboardParams } from "qhunt-lib";
import { LEADERBOARD_MODE } from "qhunt-lib/constants";

export const LeaderboardParamsValidator = validator.generate<LeaderboardParams>(
  {
    stageId: validator.string({ required: true }),
    mode: validator
      .string({ required: true })
      .valid(...Object.values(LEADERBOARD_MODE)),
  }
);

const LeaderboardValidator = { LeaderboardParamsValidator } as const;

export default LeaderboardValidator;
