import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { ObjectId } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('/tracks')
export class CourseController {
  constructor(private trackService: CourseService) {
  }

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.trackService.create(dto);
  }

  @Get()
  getALl() {
    return this.trackService.getALl();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCardDto) {
    return this.trackService.addComment(dto);
  }
}