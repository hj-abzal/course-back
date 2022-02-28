import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Course, CourseDocument } from "./schema/course.schema";
import { Model, ObjectId } from "mongoose";
import { CreateCourseDto } from "./dto/create-course.dto";
import { CreateCardDto } from "./dto/create-card.dto";
import { Card, CardDocument } from "./schema/card.schema";

@Injectable({})
export class CourseService {
  constructor(@InjectModel(Course.name) private TrackModel: Model<CourseDocument>,
              @InjectModel(Card.name) private CommentModel: Model<CardDocument>) {
  }

  async create(dto: CreateCourseDto): Promise<Course> {
    return await this.TrackModel.create({ ...dto, listens: 0 });
  }

  async getALl(): Promise<Course[]> {
    return this.TrackModel.find();
  }

  async getOne(id: ObjectId): Promise<Course> {
    return this.TrackModel.findById(id).populate("comments");
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.TrackModel.findByIdAndDelete(id);
    return res._id;
  }

  async addComment(dto: CreateCardDto): Promise<Card> {
    const track = await this.TrackModel.findById(dto.trackId);
    const comment = await this.CommentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}