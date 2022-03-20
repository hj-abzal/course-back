import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Student, StudentDocument } from "./schema/create-student.schema";
import { CreateStudentDto } from "./dto/create-student.dto";

@Injectable({})
export class StudentService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<StudentDocument>
  ) {
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    return await this.StudentModel.create({ ...dto, subscribedCourses: [] });
  }

  async getALl(): Promise<Student[]> {
    return this.StudentModel.find();
  }

  async getOne(id: ObjectId): Promise<Student> {
    return this.StudentModel.findById(id);
  }

  async findByEmail(email: string): Promise<Student> {
    return this.StudentModel.findOne({ where: { email } });
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.StudentModel.findByIdAndDelete(id);
    return res._id;
  }
}