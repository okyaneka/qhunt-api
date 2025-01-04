import { DefaultListParams } from "~/validators";
import { Timestamps } from "..";

export enum StageStatus {
  Draft = "draft",
  Publish = "publish",
}

export interface StageListParams extends DefaultListParams {
  status: StageStatus | null;
}

export interface StagePayload {
  name: string;
  storyline: string[];
}

export interface Stage extends Timestamps {
  id: string;
  name: string;
  storyline: string[];
  status: StageStatus;
  settings: {};
}
