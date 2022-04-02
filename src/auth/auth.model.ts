import { IsEmail, IsIn, IsNotEmpty } from "class-validator";


export class BaseUser {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsIn(["teacher", "student"])
  role: "teacher" | "student";
}


export class User extends BaseUser {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}