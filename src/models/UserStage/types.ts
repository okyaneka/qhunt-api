import { Periode } from "~/helpers/schema";
import { Timestamps } from "..";
import { UserPublic } from "../UserPublic";

export interface UserStageContentSettings {
  periode: Periode | null;
}

export interface UserStageContent {
  id: string;
  name: string;
  storyline: string[];
  settings: UserStageContentSettings;
}

export interface UserStageForeign {
  id: string;
  stageId: string;
  name: string;
}

export interface UserStage extends Timestamps {
  id: string;
  userPublic: Pick<UserPublic, "id" | "name" | "code">;
  stage: UserStageContent;
  score: number | null;
  storylinePassed: boolean;
  contents: string[];
}
