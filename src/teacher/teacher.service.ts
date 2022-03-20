import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { CreateCourseDto } from "../course/dto/create-course.dto";
import { Course } from "../course/schema/course.schema";
import { Teacher, TeacherDocument } from "./schema/teahcer.schema";
import { CourseService } from "../course/course.service";

@Injectable({})
export class TeacherService {
  constructor(
    private courseService: CourseService,
    @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>
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

  async findByEmail(email: string): Promise<Teacher> {
    return this.TeacherModel.findOne({}, { email });
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.TeacherModel.findByIdAndDelete(id);
    return res._id;
  }

  async addCourse(dto: CreateCourseDto): Promise<Course> {
    const teacher = await this.TeacherModel.findById(dto.teacherId);
    const course = await this.courseService.create(dto);
    teacher.courses.push(course._id);
    await teacher.save();
    return course;
  }
}