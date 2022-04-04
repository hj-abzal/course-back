import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Course, CourseDocument } from "./schema/course.schema";
import { Model, ObjectId } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";
import { Card, CardDocument } from "./schema/card.schema";
import { CreateCourseDto } from "./dto/create-course.dto";

@Injectable({})
export class CourseService {
  constructor(@InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
              @InjectModel(Card.name) private CardModel: Model<CardDocument>) {
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

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.CourseModel.findByIdAndDelete(id);
    //TODO: delete all the cards connected to course
    return res._id;
  }

  async addCard(dto: CreateCardDto): Promise<Card> {
    const course = await this.CourseModel.findById(dto.courseId);
    const card = await this.CardModel.create({ ...dto });
    course.cards.push(card._id);
    await course.save();
    return card;
  }

  async deleteCard(id: ObjectId): Promise<ObjectId> {
    return this.CardModel.findByIdAndDelete(id);
  }

}