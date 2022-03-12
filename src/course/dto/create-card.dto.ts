import { ObjectId } from "mongoose";

export class CreateCardDto {
  readonly question: string;
  readonly answer: string;
  readonly courseId: ObjectId;
}