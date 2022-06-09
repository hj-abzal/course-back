import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Wokrer, WorkerDocument } from "./schema/create-student.schema";
import { CreateWorkerDto } from "./dto/create-worker.dto";

@Injectable({})
export class WorkerService {
  constructor(
    @InjectModel(Wokrer.name) private WorkerModel: Model<WorkerDocument>
  ) {
  }

  async create(dto: CreateWorkerDto): Promise<Wokrer> {
    return await this.WorkerModel.create({ ...dto});
  }

  async getALl(): Promise<Wokrer[]> {
    return this.WorkerModel.find();
  }

  async getOne(id: ObjectId): Promise<Wokrer> {
    return this.WorkerModel.findById(id);
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.WorkerModel.findByIdAndDelete(id);
    return res._id;
  }


}