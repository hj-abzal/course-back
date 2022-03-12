import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { ObjectId } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";

@Controller("/course")
export class CourseController {
  constructor(private courseService: CourseService) {
  }

  @Get()
  getALl() {
    return this.courseService.getALl();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.courseService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.courseService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCardDto) {
    return this.courseService.addCard(dto);
  }
}