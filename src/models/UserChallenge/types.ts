import { Timestamps } from "..";
import { Challenge, ChallengeSetting } from "../Challenge";
import { Stage } from "../Stage";
import { UserPublic } from "../UserPublic";

export enum UserChallengeState {
  Storyline = "storyline",
  Content = "content",
  Progress = "progress",
  Result = "result",
}

export interface UserChallengeContentSetting
  extends Pick<ChallengeSetting, "duration" | "type"> {}

export interface UserChallengeContent
  extends Pick<Challenge, "id" | "name" | "storyline"> {
  setting: UserChallengeContentSetting;
}

export interface UserChallenge extends Timestamps {
  id: string;
  userPublic: Pick<UserPublic, "id" | "name" | "code">;
  stage: Pick<Stage, "id" | "name"> | null;
  challenge: UserChallengeContent;
  state: UserChallengeState;
  score: number | null;
  contents: string[];
}
