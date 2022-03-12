import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./schema/create-teacher.dto";
import { Course, CourseSchema } from "../course/schema/course.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])
  ],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {

}