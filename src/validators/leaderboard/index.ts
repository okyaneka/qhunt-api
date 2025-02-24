import { validator } from "~/helpers";
import {
  LEADERBOARD_MODE,
  LeaderboardParams,
} from "qhunt-lib/types/leaderboard";

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
