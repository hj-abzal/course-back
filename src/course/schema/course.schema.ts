import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Card } from "./card.schema";
import { Teacher } from "../../teacher/schema/teahcer.schema";

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  title: string;

  @Prop()
  tags: string[];

  @Prop()
  rating: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }] })
  cards: Card[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" })
  teacherId: Teacher;
}

export const CourseSchema = SchemaFactory.createForClass(Course);