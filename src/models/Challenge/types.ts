import { DefaultListParams } from "~/validators";
import { IdName, Timestamps } from "..";

export enum ChallengeType {
  Trivia = "trivia",
}

export interface ChallengeFeedback {
  positive: string;
  negative: string;
}

export interface ChallengeSettings {
  type: ChallengeType;
  duration: number;
  clue: string;
  feedback: ChallengeFeedback;
}

export interface ChallengeListParams extends DefaultListParams {
  stageId: string;
}

export interface ChallengePayload {
  name: string;
  storyline: string[];
  stageId: string;
  settings: ChallengeSettings;
}

export interface Challenge extends Timestamps {
  id: string;
  name: string;
  storyline: string[];
  stage: IdName;
  settings: ChallengeSettings;
  contents: string[];
}
