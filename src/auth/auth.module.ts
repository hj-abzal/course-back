import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TeacherModule } from "../teacher/teacher.module";
import { StudentModule } from "../student/student.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    JwtModule.register({
      secret: "SECRET",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {

}