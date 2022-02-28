import { ObjectId } from 'mongoose';

export class CreateCardDto {
  readonly username: string;
  readonly text: string;
  readonly trackId: ObjectId
}