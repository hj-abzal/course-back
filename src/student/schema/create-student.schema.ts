import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Course } from "../../course/schema/course.schema";

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] })
  subscribedCourses: any[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);