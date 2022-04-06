import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { StudentService } from "./student.service";
import { ObjectId } from "mongoose";
import { CreateStudentDto } from "./dto/create-student.dto";

@Controller("/student")
export class StudentController {
  constructor(private studentService: StudentService) {
  }

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @Post("/subscribe")
  subscribeToCourse(@Body() dto: { courseId: string, userId: ObjectId }) {
    return this.studentService.subscribeToCourse(dto);
  }

  @Post("/unsubscribe")
  unsubscribeToCourse(@Body() dto: { ids: ObjectId[] }) {
    return this.studentService.deletedCourses(dto.ids);
  }

  @Get()
  getALl() {
    return this.studentService.getALl();
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.studentService.getOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: ObjectId) {
    return this.studentService.delete(id);
  }
}