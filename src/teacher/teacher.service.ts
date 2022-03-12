import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { Teacher, TeacherDocument } from "./schema/create-teacher.dto";
import { CreateCourseDto } from "../course/dto/create-course.dto";
import { Course, CourseDocument } from "../course/schema/course.schema";

@Injectable({})
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>,
    @InjectModel(Course.name) private CourseModel: Model<CourseDocument>
  ) {
  }

  async create(dto: CreateTeacherDto): Promise<Teacher> {
    return await this.TeacherModel.create({ ...dto, created_courses: [] });
  }

  async getALl(): Promise<Teacher[]> {
    return this.TeacherModel.find();
  }

  async getOne(id: ObjectId): Promise<Teacher> {
    return this.TeacherModel.findById(id).populate("courses");
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.TeacherModel.findByIdAndDelete(id);
    return res._id;
  }

  async addCourse(dto: CreateCourseDto): Promise<Course> {
    const teacher = await this.TeacherModel.findById(dto.teacherId);
    const course = await this.CourseModel.create({ ...dto, cards: [] });
    teacher.courses.push(course._id);
    await teacher.save();
    return course;
  }
}