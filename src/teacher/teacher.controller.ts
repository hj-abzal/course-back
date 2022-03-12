import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { TeacherService } from "./teacher.service";
import { ObjectId } from "mongoose";
import { CreateCourseDto } from "../course/dto/create-course.dto";

@Controller("/teacher")
export class TeacherController {
  constructor(private courseService: TeacherService) {
  }

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.courseService.create(dto);
  }

  @Get()
  getALl() {
    return this.courseService.getALl();
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.courseService.getOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: ObjectId) {
    return this.courseService.delete(id);
  }

  @Post("/course")
  addComment(@Body() dto: CreateCourseDto) {
    return this.courseService.addCourse(dto);
  }
}