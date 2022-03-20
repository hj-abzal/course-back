import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "./schema/create-student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {

}