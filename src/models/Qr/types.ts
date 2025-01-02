import { DefaultListParams } from "~/validators";
import { IdName, Timestamps } from "..";

export enum QrStatus {
  Draft = "draft",
  Publish = "publish",
}

export enum QrContentType {
  Challenge = "challenge",
}

export interface QrContent {
  type: QrContentType;
  refId: string;
}

export interface QrLocation {
  label: string;
  longitude: number;
  latitude: number;
}

export interface QrListQuery extends DefaultListParams {
  status: QrStatus | null;
}

export interface QrPayload {
  code: string;
  status: QrStatus;
}

export interface QrUpdatePayload {
  status: QrStatus;
  content: QrContent | null;
  location: QrLocation | null;
}

export interface QrGeneratePayload {
  amount: number;
}

export interface QrDeleteBulkPayload {
  ids: string[];
}

export interface Qr extends QrPayload, Timestamps {
  id: string;
  stage: IdName | null;
  challenge: IdName | null;
  content: QrContent | null;
  location: QrLocation | null;
  accessCount: number | null;
}
