import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Student, StudentDocument } from "./schema/create-student.schema";
import { CreateStudentDto } from "./dto/create-student.dto";
import { MessageType } from "../course/course.model";

@Injectable({})
export class StudentService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<StudentDocument>
  ) {
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    return await this.StudentModel.create({ ...dto, subscribedCourses: [] });
  }

  async subscribeToCourse(params: { courseId: string, userId: ObjectId }): Promise<any> {
    const student = await this.StudentModel.findById(params.userId);
    student.subscribedCourses.push(params.courseId);
    await student.save();
    return { message: "ok" };
  }

  async deletedCourses(courseIds: ObjectId[]): Promise<MessageType> {
    const students = await this.StudentModel.find();
    students.map((s) => {
      courseIds.map(async (id) => {
        await this.StudentModel.updateOne({
          subscribedCourses: s.subscribedCourses.filter(el => el.toString() !== id)
        });
      });
    });
    return { message: "ok" };
  }

  async getALl(): Promise<Student[]> {
    return this.StudentModel.find();
  }

  async getOne(id: ObjectId): Promise<Student> {
    return this.StudentModel.findById(id);
  }

  async findByEmail(email: string): Promise<Student> {
    return this.StudentModel.findOne({}, {}, { where: { email } });
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.StudentModel.findByIdAndDelete(id);
    return res._id;
  }


}