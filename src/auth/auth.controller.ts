import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./auth.model";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/login")
  login(@Body() user: { email: string, password: string, role: "teacher" | "student" }) {
    return this.authService.login(user);
  }

  @Post("/register")
  register(@Body() user: User) {
    return this.authService.register(user);
  }


}