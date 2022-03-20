import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./auth.model";
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

  async login(checkUser: any): Promise<any> {
    const user = await this.validateUser(checkUser);
    return this.generateToken(user, checkUser.role);
  }

  async register(user: User): Promise<any> {
    const { email, first_name, last_name, role } = user;
    const candidate = role === "teacher"
      ? await this.checkTeacher(user.email)
      : await this.checkStudent(user.email);

    console.log(candidate);
    if (candidate) {
      throw new HttpException("Эл.почта уже используется для этого сервиса", HttpStatus.BAD_REQUEST);
    } else {
      const hashPassword = await bcrypt.hash(user.password, 5);

      const newUser = role === "teacher"
        ? await this.teacherService.create({ email, first_name, last_name, password: hashPassword, courses: [] })
        : await this.studentService.create({
          email,
          first_name,
          last_name,
          password: hashPassword,
          subscribedCourses: []
        });

      return this.generateToken(newUser, role);
    }
  }


  async checkTeacher(email: string): Promise<any> {
    return this.teacherService.findByEmail(email);
  }

  async checkStudent(email: string): Promise<any> {
    return this.studentService.findByEmail(email);
  }

  async generateToken(user: any, role: "teacher" | "student") { //TODO: fix any
    return {
      token: this.jwtService.sign({ email: user.email, id: user._id, role })
    };
  }

  private async validateUser(checkUser: any) {
    const user = checkUser.role === "teacher"
      ? await this.teacherService.findByEmail(checkUser.email)
      : await this.studentService.findByEmail(checkUser.email);
    const validatePass = await bcrypt.compare(checkUser.password, user.password);
    if (user && validatePass) {
      return user;
    } else {
      throw new UnauthorizedException({ message: "Не корректная почта и/или пароль" });
    }
  }
}
