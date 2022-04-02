import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { TeacherService } from "./teacher.service";
import { ObjectId } from "mongoose";
import { CreateCourseDto } from "../course/dto/create-course.dto";

@Controller("/teacher")
export class TeacherController {
  constructor(private teacherService: TeacherService) {
  }

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.teacherService.create(dto);
  }

  @Get()
  getALl() {
    return this.teacherService.getALl();
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.teacherService.getOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: ObjectId) {
    return this.teacherService.delete(id);
  }

  @Post("/course")
  addCourse(@Body() dto: CreateCourseDto) {
    return this.teacherService.addCourse(dto);
  }
}