import { TriviaOption } from "../Trivia";
import { UserPublic } from "../UserPublic";

export interface UserTriviaChallenge {
  id: string;
  challengeId: string;
  name: string;
}

export interface UserTriviaContent {
  id: string;
  question: string;
  allowMultiple: boolean;
  options: Pick<TriviaOption, "text">[];
}

export interface UserTrivia {
  id: string;
  userPublic: Pick<UserPublic, "id" | "name" | "code">;
  userChallenge: UserTriviaChallenge;
  content: UserTriviaContent;
  answer: string | null;
  point: number | null;
  isDone: boolean;
}
