import { Timestamps } from "..";
import { ChallengeType } from "../Challenge";
import { UserPublic } from "../UserPublic";

export enum UserChallengeState {
  Storyline = "storyline",
  Content = "content",
  Progress = "progress",
  Result = "result",
}

export interface UserChallengeStage {
  id: string;
  stageId: string;
  name: string;
}

export interface UserChallengeContentSettings {
  duration: number;
  type: ChallengeType;
}

export interface UserChallengeContent {
  id: string;
  name: string;
  storyline: string[];
  settings: UserChallengeContentSettings;
}

export interface UserChallengeForeign {
  id: string;
  challengeId: string;
  name: string;
}

export interface UserChallenge extends Timestamps {
  id: string;
  userPublic: Pick<UserPublic, "id" | "name" | "code">;
  stage: UserChallengeStage | null;
  challenge: UserChallengeContent;
  founded: boolean;
  state: UserChallengeState;
  score: number | null;
  contents: string[];
}
