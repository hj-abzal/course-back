import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Course, CourseDocument } from "./schema/course.schema";
import { Model, ObjectId } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";
import { Card, CardDocument } from "./schema/card.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { MessageType } from "./course.model";
import { StudentService } from "../student/student.service";

@Injectable({})
export class CourseService {
  constructor(@InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
              @InjectModel(Card.name) private CardModel: Model<CardDocument>,
              private studentService: StudentService
  ) {
  }

  async create(dto: CreateCourseDto): Promise<any> { //TODO: fix any
    return this.CourseModel.create({ ...dto, cards: [] });
  }

  async getALl(): Promise<Course[]> {
    return this.CourseModel.find();
  }

  async getOne(id: ObjectId): Promise<Course> {
    return this.CourseModel.findById(id).populate("cards");
  }

  async delete(ids: ObjectId[]): Promise<MessageType> {
    ids.map(async (id) => {
      await this.studentService.deletedCourses(ids);
      const res = await this.CourseModel.findByIdAndDelete(id);
      res.cards.map(async (id) => {
        await this.CardModel.findByIdAndDelete(id);
      });
    });
    return { message: "ok" };
  }

  async addCard(dto: CreateCardDto): Promise<any> {
    const course = await this.CourseModel.findById(dto.courseId);
    const card = await this.CardModel.create({ ...dto });
    course.cards.push(card._id);
    await course.save();
    const { _id, question, answer } = card;
    return { _id, question, answer, courseId: dto.courseId };
  }

  async deleteCard(ids: { cardIds: ObjectId[], courseId: ObjectId }): Promise<MessageType> {
    const course = await this.CourseModel.findById(ids.courseId);
    ids.cardIds.map(async (id) => {
      // @ts-ignore
      await this.CourseModel.updateOne({ cards: course.cards.filter(el => el._id !== id) });
      await this.CardModel.findByIdAndDelete(id);
    });

    return { message: "ok" };
  }

}