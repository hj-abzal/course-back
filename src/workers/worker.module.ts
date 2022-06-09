import { Module } from "@nestjs/common";
import { WorkerController } from "./worker.controller";
import { WorkerService } from "./worker.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Wokrer, WorkerSchema } from "./schema/create-student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wokrer.name, schema: WorkerSchema }])
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class WorkerModule {

}