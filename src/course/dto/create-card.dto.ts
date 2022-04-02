import { ObjectId } from "mongoose";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  readonly question: string;

  @IsString()
  readonly answer: string;

  @IsNotEmpty()
  readonly courseId: ObjectId;
}