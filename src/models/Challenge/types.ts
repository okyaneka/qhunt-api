import { DefaultListParams } from "~/validators";
import { IdName, Timestamps } from "..";

export enum ChallengeType {
  Trivia = "trivia",
}

export interface ChallengeFeedback {
  positive: string;
  negative: string;
}

export interface ChallengeSetting {
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
  setting: ChallengeSetting;
}

export interface Challenge
  extends Omit<ChallengePayload, "stageId">,
    Timestamps {
  id: string;
  stage: IdName;
}
