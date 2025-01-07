import { Timestamps } from "..";
import { ChallengeForeign, ChallengeType } from "../Challenge";
import { UserPublicForeign } from "../UserPublic";
import { UserStageForeign } from "../UserStage";

// export enum UserChallengeState {
//   Storyline = "storyline",
//   Content = "content",
//   Progress = "progress",
//   Result = "result",
// }

export enum UserChallengeStatus {
  Undiscovered = "undiscovered",
  OnGoing = "ongoing",
  Completed = "completed",
  Failed = "failed",
}

export interface UserChallengeForeign {
  id: string;
  challengeId: string;
  name: string;
}

export interface UserChallenge extends Timestamps {
  id: string;
  challenge: ChallengeForeign;
  userStage: UserStageForeign | null;
  userPublic: UserPublicForeign;
  status: UserChallengeStatus;
  score: number | null;
  contents: string[];
}
