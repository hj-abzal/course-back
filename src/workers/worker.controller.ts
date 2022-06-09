import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { WorkerService } from "./worker.service";
import { ObjectId } from "mongoose";
import { CreateWorkerDto } from "./dto/create-worker.dto";

@Controller("/workers")
export class WorkerController {
  constructor(private studentService: WorkerService) {
  }

  @Post()
  create(@Body() dto: CreateWorkerDto) {
    return this.studentService.create(dto);
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