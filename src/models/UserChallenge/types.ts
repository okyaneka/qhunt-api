import { Timestamps } from "..";
import { Challenge, ChallengeSettings } from "../Challenge";
import { Stage } from "../Stage";
import { UserPublic } from "../UserPublic";

export enum UserChallengeState {
  Storyline = "storyline",
  Content = "content",
  Progress = "progress",
  Result = "result",
}

export interface UserChallengeContentSettings
  extends Pick<ChallengeSettings, "duration" | "type"> {}

export interface UserChallengeContent
  extends Pick<Challenge, "id" | "name" | "storyline"> {
  settings: UserChallengeContentSettings;
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
