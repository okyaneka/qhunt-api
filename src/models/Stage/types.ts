import { DefaultListParams } from "~/validators";
import { Timestamps } from "..";
import { Periode } from "~/helpers/schema";

export enum StageStatus {
  Draft = "draft",
  Publish = "publish",
}

export interface StageSettings {
  periode: Periode | null;
  canDoRandomChallenges: boolean;
  canStartFromChallenges: boolean;
}

export interface StageListParams extends DefaultListParams {
  status: StageStatus | null;
}

export interface StagePayload {
  name: string;
  storyline: string[];
  status: StageStatus;
  contents: string[];
  settings: StageSettings;
}

export type StageForeign = Pick<Stage, "id" | "name" | "storyline"> & {
  settings: Pick<StageSettings, "periode">;
};

export interface Stage extends Timestamps {
  id: string;
  name: string;
  storyline: string[];
  status: StageStatus;
  contents: string[];
  settings: StageSettings;
}
