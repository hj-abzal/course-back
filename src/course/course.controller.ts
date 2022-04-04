import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.courseService.getOne(id);
  }

  @Post("/delete")
  delete(@Body() req: { ids: ObjectId[] }) {
    return this.courseService.delete(req.ids);
  }

  @Post("/card")
  addCard(@Body() dto: CreateCardDto) {
    return this.courseService.addCard(dto);
  }

  @Post("/card/delete")
  deleteCard(@Body() req: { cardIds: ObjectId[], courseId: ObjectId }) {
    return this.courseService.deleteCard(req);
  }
}