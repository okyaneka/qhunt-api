import { IdName, Timestamps } from "~/models";
import { ChallengeFeedback } from "~/models/Challenge";

export interface TriviaOption {
  text: string;
  isCorrect: boolean;
  point: number;
}

export interface TriviaPayload {
  id?: string;
  question: string;
  feedback: ChallengeFeedback;
  allowMultiple: boolean;
  options: TriviaOption[];
}

export interface Trivia extends TriviaPayload, Timestamps {
  id: string;
  challenge: IdName;
}
