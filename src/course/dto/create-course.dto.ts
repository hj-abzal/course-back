import { ObjectId } from "mongoose";
import { Card } from "../schema/card.schema";

export class CreateCourseDto {
  readonly title: string;
  readonly tags: string;
  readonly rating: number;
  readonly cards: Card[];
  readonly teacherId: ObjectId;
}