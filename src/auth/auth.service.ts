import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { BaseUser, User } from "./auth.model";
import { TeacherService } from "../teacher/teacher.service";
import { StudentService } from "../student/student.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService {
  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
    private jwtService: JwtService
  ) {
  }

  async login(checkUser: BaseUser): Promise<any> {
    const user: any = await this.validateUser(checkUser);
    const { token } = await this.generateToken(user, checkUser.role);

    let res: any = {
      token,
      user_id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: checkUser.role
    };
    checkUser.role === "teacher"
      ? res.courses = user.courses
      : res.subscribedCourses = user.subscribedCourses;
    return res;
  }

  async register(user: User): Promise<any> {
    const { email, first_name, last_name, role } = user;
    const candidate = role === "teacher"
      ? await this.checkTeacher(user.email)
      : await this.checkStudent(user.email);
    if (candidate) {
      throw new HttpException("Email is already in use", HttpStatus.BAD_REQUEST);
    } else {
      const hashPassword = await bcrypt.hash(user.password, 5);

      role === "teacher"
        ? await this.teacherService.create({ email, first_name, last_name, password: hashPassword, courses: [] })
        : await this.studentService.create({
          email,
          first_name,
          last_name,
          password: hashPassword,
          subscribedCourses: []
        });

      return { massage: "ok" };
    }
  }


  async checkTeacher(email: string): Promise<any> {
    return this.teacherService.findByEmail(email);
  }

  async checkStudent(email: string): Promise<any> {
    return this.studentService.findByEmail(email);
  }

  async generateToken(user: any, role: "teacher" | "student") {
    return {
      token: this.jwtService.sign({ email: user.email, id: user._id, role })
    };
  }

  private async validateUser(checkUser: BaseUser) {
    const user = checkUser.role === "teacher"
      ? await this.teacherService.findByEmail(checkUser.email)
      : await this.studentService.findByEmail(checkUser.email);
    if (user) {
      const validatePass = await bcrypt.compare(checkUser.password, user.password);
      if (validatePass) {
        return user;
      }
    } else {
      throw new UnauthorizedException({ message: "password or login is not correct" });
    }
  }
}
