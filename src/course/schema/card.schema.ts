import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Course } from "./course.schema";

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Course'})
  track: Course;
}

export  const CardSchema = SchemaFactory.createForClass(Card)