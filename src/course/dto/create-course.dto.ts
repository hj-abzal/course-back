import { ObjectId } from "mongoose";
import { Card } from "../schema/card.schema";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  readonly tags: string[];

  @IsNumber()
  readonly rating: number;

  readonly cards: Card[];

  @IsNotEmpty()
  readonly teacherId: ObjectId;
}