import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Course } from "../../course/schema/course.schema";

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] })
  courses: Course[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);