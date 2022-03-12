import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseModule } from "./course/course.module";
import { TeacherModule } from "./teacher/teacher.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Suan:suan7777@nestjs.xaflp.mongodb.net/music-platform?retryWrites=true&w=majority"),
    CourseModule,
    TeacherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
