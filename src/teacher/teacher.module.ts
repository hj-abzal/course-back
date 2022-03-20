import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./schema/teahcer.schema";
import { CourseModule } from "../course/course.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    CourseModule
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule {

}